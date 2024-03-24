"use client";
import { useVideoContext } from "@context/video-context.provider";
import { Button } from "@ui/button";
import { DownloadIcon } from "ui/icons";

interface DownloadButtonProps {
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ className }) => {
  const [video] = useVideoContext();

  const handleDownloadRecording = () => {
    if (!video) throw new Error("Video not found");
    const downloadLink = document.createElement("a");
    downloadLink.href = video.url;
    downloadLink.target = "_blank";
    downloadLink.download = video!.name;
    downloadLink.click();
  };

  return (
    <Button className={className} onClick={handleDownloadRecording}>
      Download recording <DownloadIcon size="20px" className="ml-2" />
    </Button>
  );
};

export default DownloadButton;
