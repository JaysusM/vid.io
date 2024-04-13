import DownloadButton from "@components/download-button.component";
import SaveAndShareButton from "@components/save-and-share-button.component";
import VideoContextPreview from "@components/video-context-preview.component";
import { Button } from "@ui/button";
import Link from "next/link";
import { RecordIcon } from "ui/icons";

const VideoPreviewPage = () => {
  return (
    <div className="flex flex-row justify-center items-center min-h-[calc(100vh-10px)] w-full gap-10">
      <VideoContextPreview />
      <div className="flex flex-col justify-center items-center gap-3">
        <DownloadButton className="min-w-full" />
        <Link href="/" passHref>
          <Button className="min-w-full">
            Record another clip! <RecordIcon size="20px" className="ml-2" />
          </Button>
        </Link>
        <SaveAndShareButton />
      </div>
    </div>
  );
};

export default VideoPreviewPage;
