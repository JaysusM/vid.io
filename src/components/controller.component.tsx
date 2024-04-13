"use client";
import { useVideoContext } from "@context/video-context.provider";
import useScreenRecordController from "@hooks/use-screen-record-controller.hook";
import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { Button } from "@ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RecordIcon, StopIcon } from "ui/icons";

enum RecordingStatus {
  NONE = "NONE",
  RECORDING = "RECORDING",
  RECORDED = "RECORDED",
}

const Controller = () => {
  const router = useRouter();
  const [, setVideo] = useVideoContext();
  const [startRecord, stopRecord, canRecord] = useScreenRecordController({
    onStopRecording: (video) => {
      setRecordingStatus(RecordingStatus.RECORDED);
      setVideo(video);
      router.push(`/video/preview`);
    },
    onError: () => {
      setRecordingStatus(RecordingStatus.NONE);
    },
  });
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>(
    RecordingStatus.NONE
  );

  const handleRecordStart = () => {
    setRecordingStatus(RecordingStatus.RECORDING);
    startRecord();
  };

  const handleRecordStop = () => {
    stopRecord();
  };

  if (!canRecord) {
    return (
      <Alert>
        <AlertTitle>Browser doesn&apos;t Support Recording.</AlertTitle>
        <AlertDescription>
          Please Try Again Using a Different Browser.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      {recordingStatus === RecordingStatus.NONE && (
        <Button onClick={handleRecordStart}>
          Record Your Screen! <RecordIcon size="20px" className="ml-2" />
        </Button>
      )}
      {recordingStatus === RecordingStatus.RECORDING && (
        <Button onClick={handleRecordStop} className="animate-pulse">
          Stop Recording <StopIcon size="20px" className="ml-2" />
        </Button>
      )}
    </>
  );
};

export default Controller;
