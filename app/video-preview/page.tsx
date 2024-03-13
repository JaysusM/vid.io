"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useVideoContext } from "@context/video-context.provider";
import useCreateShareableVideoLink from "@hooks/use-create-shareable-video-link.hook";
import { Button } from "@ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CopyIcon, DownloadIcon, RecordIcon, ShareIcon } from "ui/icons";

const VideoPreviewPage = () => {
  const router = useRouter();
  const [video, setVideo] = useVideoContext();
  const { user } = useUser();
  const [createShareableVideoLink, { isCreatingLink }] =
    useCreateShareableVideoLink(user);
  const [shareableLink, setShareableLink] = useState<string>();

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
    const link = await createShareableVideoLink(video.file);
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard");
    setShareableLink(link);
  };

  useEffect(() => {
    if (!video) {
      router.push("/");
    }

    () => {
      setVideo(undefined);
    };
  }, []);

  return (
    <div className="flex flex-row justify-center items-center min-h-[calc(95vh-30px)] w-full gap-10">
      {video && <video src={video.url} controls className="max-w-[70%]" />}
      <div className="flex flex-col justify-center items-center gap-3">
        <Button onClick={handleDownloadRecording}>
          Download recording <DownloadIcon size="20px" className="ml-2" />
        </Button>
        <Button onClick={() => router.push("/")}>
          Record another clip! <RecordIcon size="20px" className="ml-2" />
        </Button>
        {user && !shareableLink && (
          <Button onClick={handleVideoShare} disabled={isCreatingLink}>
            Create shareable link <ShareIcon size="20px" className="ml-2" />
          </Button>
        )}
        {shareableLink && (
          <Button onClick={() => navigator.clipboard.writeText(shareableLink)}>
            Copy link <CopyIcon size="20px" className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoPreviewPage;
