"use client";
import useCanUploadFile from "@hooks/use-can-upload-file.hook";
import { Button } from "@ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";
import { useRouter } from "next/navigation";
import { ShareIcon } from "ui/icons";

const SaveAndShareButton = () => {
  const router = useRouter();
  const [canUploadFile] = useCanUploadFile();

  const handleVideoShare = async () => {
    router.push("/video/upload");
  };

  return (
    <>
      {canUploadFile === "yes" && (
        <Button className="min-w-full" onClick={handleVideoShare}>
          Save and share <ShareIcon size="20px" className="ml-2" />
        </Button>
      )}
      {canUploadFile === "limited" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="min-w-full" onClick={handleVideoShare}>
                Save and share*
                <ShareIcon size="20px" className="ml-2" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-center">
                6 Hours Expiration
                <br />
                Log In To Keep Videos Forever
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};

export default SaveAndShareButton;
