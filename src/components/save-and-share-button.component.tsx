"use client";
import useCanUploadFile from "@hooks/use-can-upload-file.hook";
import { Button } from "@ui/button";
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
      {canUploadFile && (
        <Button className="min-w-full" onClick={handleVideoShare}>
          Save and share <ShareIcon size="20px" className="ml-2" />
        </Button>
      )}
    </>
  );
};

export default SaveAndShareButton;
