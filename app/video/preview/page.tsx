"use client";
import { useVideoContext } from "@context/video-context.provider";
import useCanUploadFile from "@hooks/use-can-upload-file.hook";
import { Button } from "@ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DownloadIcon, RecordIcon, ShareIcon } from "ui/icons";

const VideoPreviewPage = () => {
  const router = useRouter();
  const [video] = useVideoContext();
  const [canUploadFile] = useCanUploadFile();

  const handleDownloadRecording = () => {
    if (!video) throw new Error("Video not found");
    const downloadLink = document.createElement("a");
    downloadLink.href = video.url;
    downloadLink.target = "_blank";
    downloadLink.download = video!.name;
    downloadLink.click();
  };

  const handleVideoShare = async () => {
    if (!video) throw new Error("Video not found");
    router.push("/video/upload");
  };

  useEffect(() => {
    if (!video) {
      router.push("/");
    }
  }, [video, router]);

  return (
    <div className="flex flex-row justify-center items-center min-h-[calc(95vh-30px)] w-full gap-10">
      {video && (
        <video src={video.url} controls className="max-w-[70%] min-w-[70%]" />
      )}
      <div className="flex flex-col justify-center items-center gap-3">
        <Button className="min-w-full" onClick={handleDownloadRecording}>
          Download recording <DownloadIcon size="20px" className="ml-2" />
        </Button>
        <Button className="min-w-full" onClick={() => router.push("/")}>
          Record another clip! <RecordIcon size="20px" className="ml-2" />
        </Button>
        {canUploadFile && (
          <Button className="min-w-full" onClick={handleVideoShare}>
            Save and share <ShareIcon size="20px" className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoPreviewPage;
