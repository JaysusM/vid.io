"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import useCreateShareableVideoLink from "@hooks/use-create-shareable-video-link.hook";
import useScreenRecordController from "@hooks/use-screen-record-controller.hook";
import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { Button } from "@ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  CopyIcon,
  DownloadIcon,
  PlayIcon,
  RecordIcon,
  ShareIcon,
  StopIcon,
} from "ui/icons";

enum RecordingStatus {
  NONE = "NONE",
  RECORDING = "RECORDING",
  RECORDED = "RECORDED",
}

const Controller = () => {
  const [startRecord, stopRecord, video, canRecord] = useScreenRecordController(
    {
      onStopRecording: () => {
        setRecordingStatus(RecordingStatus.RECORDED);
      },
      onError: () => {
        setRecordingStatus(RecordingStatus.NONE);
      },
    }
  );
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>(
    RecordingStatus.NONE
  );
  const [showPreview, setShowPreview] = useState(false);
  const { user } = useUser();
  const [createShareableVideoLink, { isCreatingLink }] =
    useCreateShareableVideoLink(user);
  const [shareableLink, setShareableLink] = useState<string>();

  useEffect(() => {
    setShowPreview(false);
  }, [video]);

  const handleRecordStart = () => {
    setRecordingStatus(RecordingStatus.RECORDING);
    startRecord();
  };

  const handleRecordStop = () => {
    setRecordingStatus(RecordingStatus.RECORDED);
    stopRecord();
  };

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

  if (!canRecord) {
    return (
      <Alert>
        <AlertTitle>Browser doesn&apos;t support recording.</AlertTitle>
        <AlertDescription>
          Please try again using a different browser.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      {recordingStatus === RecordingStatus.NONE && (
        <Button onClick={handleRecordStart}>
          Record your screen! <RecordIcon size="20px" className="ml-2" />
        </Button>
      )}
      {recordingStatus === RecordingStatus.RECORDING && (
        <Button onClick={handleRecordStop} className="animate-pulse">
          Stop recording <StopIcon size="20px" className="ml-2" />
        </Button>
      )}
      {recordingStatus === RecordingStatus.RECORDED && (
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row flex-wrap justify-center gap-3">
            <Button onClick={handleDownloadRecording}>
              Download recording <DownloadIcon size="20px" className="ml-2" />
            </Button>
            {!showPreview && (
              <Button onClick={() => setShowPreview(true)}>
                Play <PlayIcon size="20px" className="ml-2" />
              </Button>
            )}
            <Button onClick={handleRecordStart}>
              Record another clip! <RecordIcon size="20px" className="ml-2" />
            </Button>
            {user &&
              !shareableLink &&
              (!isCreatingLink ? (
                <Button onClick={handleVideoShare}>
                  Create shareable link{" "}
                  <ShareIcon size="20px" className="ml-2" />
                </Button>
              ) : (
                <Button disabled>
                  Creating shareable link{" "}
                  <ShareIcon size="20px" className="ml-2" />
                </Button>
              ))}
            {shareableLink && (
              <Button
                onClick={() => navigator.clipboard.writeText(shareableLink)}
              >
                Copy link <CopyIcon size="20px" className="ml-2" />
              </Button>
            )}
          </div>
          {showPreview && (
            <video src={video!.url} controls className="max-w-[700px] pt-10" />
          )}
        </div>
      )}
    </>
  );
};

export default Controller;
