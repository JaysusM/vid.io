"use client";

import { Button } from "@ui/button";
import { toast } from "sonner";
import { ShareIcon } from "ui/icons";

interface ShareButtonProps {
  videoId: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ videoId }) => {
  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}/video/${videoId}`;
    navigator.clipboard.writeText(shareUrl);

    toast.info("Link copied to clipboard");
  };

  return (
    <Button onClick={copyShareLink}>
      Share <ShareIcon size="20px" className="ml-2" />
    </Button>
  );
};

export default ShareButton;
