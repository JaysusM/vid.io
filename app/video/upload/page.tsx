"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useVideoContext } from "@context/video-context.provider";
import { Button } from "@ui/button";
import { Progress } from "@ui/progress";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ShareIcon } from "ui/icons";

enum UploadStatus {
  None = "none",
  Uploading = "uploading",
  Transcoding = "transcoding",
  Done = "done",
  Completed = "completed",
}

const UploadPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [video, setVideo] = useVideoContext();
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.None);

  useEffect(() => {
    if (!video || !user) {
      return router.push("/");
    }

    setStatus(UploadStatus.Transcoding);

    const data = new FormData();
    data.append("file", video.file);

    fetch("/api/video/transcode", {
      method: "POST",
      body: data,
    })
      .then((response) => response.blob())
      .then((blob) => {
        setStatus(UploadStatus.Uploading);
        const newVideoName = video.name.split(".webm").join(".mp4");
        fetch(
          `/api/video/upload?videoName=${newVideoName}&userEmail=${user.email}`,
          {
            method: "POST",
            body: blob,
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setStatus(UploadStatus.Done);
            setVideo({
              ...video,
              name: data.video.name,
              url: data.video.url,
              id: data.video._id,
              file: blob,
            });

            setTimeout(() => {
              setStatus(UploadStatus.Completed);
            }, 1000);
          });
      });

    return () => {
      setVideo(undefined);
    };
  }, []);

  const message = useMemo(() => {
    switch (status) {
      case UploadStatus.Uploading:
        return "Uploading...";
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
      case UploadStatus.Uploading:
        return 66;
      case UploadStatus.Transcoding:
        return 33;
      case UploadStatus.Done:
        return 100;
      default:
        return 0;
    }
  }, [status]);

  const copyShareLink = () => {
    if (video?.id) {
      const shareUrl = `${window.location.origin}/video/${video.id}`;
      navigator.clipboard.writeText(shareUrl);

      toast.info("Link copied to clipboard");
    }
  };

  return (
    <div className="min-h-[calc(95vh-30px)] flex min-w-screen justify-center items-center">
      <div className="flex flex-col min-w-[300px] justify-center items-center gap-3">
        {status !== UploadStatus.Completed && (
          <>
            <a>{message}</a>
            <Progress value={value} />
          </>
        )}
        {status === UploadStatus.Completed && (
          <>
            <video
              src={video?.url}
              controls
              className="max-w-[70vw] min-w-[70vw] transition-opacity"
            />
            <Button onClick={copyShareLink}>
              Copy share link <ShareIcon size="20px" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
