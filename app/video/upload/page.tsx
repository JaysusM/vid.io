"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useVideoContext } from "@context/video-context.provider";
import useCreateThumbnail from "@hooks/use-create-thumbnail.hook";
import { VideoModel } from "@models/video";
import { Progress } from "@ui/progress";
import { transcode } from "buffer";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

enum UploadStatus {
  None = "none",
  UploadingVideo = "uploading_video",
  UploadingThumbnail = "uploading_thumbnail",
  Transcoding = "transcoding",
  Done = "done",
  Completed = "completed",
}

const UploadPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [video, setVideo] = useVideoContext();
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.None);
  const [createThumbnail] = useCreateThumbnail();

  const uploadBlobFile = async (
    blob: Blob
  ): Promise<VideoModel & { _id: string }> => {
    const newVideoName = video!.name.split(".webm").join(".mp4");
    const response = await fetch(
      `/api/video/upload?videoName=${newVideoName}&userEmail=${user!.email}`,
      {
        method: "POST",
        body: blob,
      }
    );

    const jsonResponse = await response.json();
    return jsonResponse.video;
  };

  const createAndUploadThumbnail = async (
    blob: Blob
  ): Promise<VideoModel & { _id: string }> => {
    const newVideoName = video!.name.split(".webm").join(".mp4");
    const response = await fetch(
      `/api/video/upload?videoName=${newVideoName}&userEmail=${user!.email}`,
      {
        method: "POST",
        body: blob,
      }
    );

    const jsonResponse = await response.json();
    const thumbnail = await createThumbnail(blob, jsonResponse.video._id);

    const videoResponse = jsonResponse.video;
    videoResponse.thumbnail = thumbnail;
    return videoResponse;
  };

  const transcodeVideo = async (): Promise<Blob> => {
    setStatus(UploadStatus.Transcoding);
    const data = new FormData();
    data.append("file", video!.file);

    const response = await fetch("/api/video/transcode", {
      method: "POST",
      body: data,
    });
    return response.blob();
  };

  useEffect(() => {
    if (!video || !user) {
      return router.push("/");
    }

    transcodeVideo().then((blob) => {
      setStatus(UploadStatus.UploadingVideo);
      uploadBlobFile(blob).then((data) => {
        setStatus(UploadStatus.UploadingThumbnail);
        createAndUploadThumbnail(blob).then(() => {
          setStatus(UploadStatus.Done);
          setVideo({
            ...video,
            name: data.name,
            id: data._id,
            file: blob,
          });

          setTimeout(() => {
            router.push(`/video/${data._id}`);
          }, 1000);
        });
      });
    });

    return () => {
      setVideo(undefined);
    };
  }, []);

  const message = useMemo(() => {
    switch (status) {
      case UploadStatus.UploadingThumbnail:
        return "Uploading thumbnail...";
      case UploadStatus.UploadingVideo:
        return "Uploading video...";
      case UploadStatus.Transcoding:
        return "Transcoding...";
      case UploadStatus.Done:
        return "Done!";
      default:
        return "";
    }
  }, [status]);

  const value = useMemo(() => {
    switch (status) {
      case UploadStatus.UploadingThumbnail:
        return 75;
      case UploadStatus.UploadingVideo:
        return 50;
      case UploadStatus.Transcoding:
        return 25;
      case UploadStatus.Done:
        return 100;
      default:
        return 0;
    }
  }, [status]);

  return (
    <div className="min-h-[calc(95vh-30px)] flex min-w-screen justify-center items-center">
      <div className="flex flex-col min-w-[300px] justify-center items-center gap-3">
        {status !== UploadStatus.Completed && (
          <>
            <a>{message}</a>
            <Progress value={value} />
          </>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
