"use client";
import useScreenRecordController from "@hooks/use-screen-record-controller.hook";
import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { Button } from "@ui/button";
import { useState } from "react";
import { DownloadIcon, RecordIcon, StopIcon } from "ui/icons";

enum RecordingStatus {
  NONE = "NONE",
  RECORDING = "RECORDING",
  RECORDED = "RECORDED",
}

const Controller = () => {
  const [startRecord, stopRecord, media, canRecord] = useScreenRecordController(
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

  const handleRecordStart = () => {
    setRecordingStatus(RecordingStatus.RECORDING);
    startRecord();
  };

  const handleRecordStop = () => {
    setRecordingStatus(RecordingStatus.RECORDED);
    stopRecord();
  };

  const handleDownloadRecording = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = media!;
    downloadLink.target = "_blank";
    downloadLink.download = `vidio_${new Date().getTime()}.webm`;
    downloadLink.click();
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
        <Button
          onClick={handleRecordStart}
          className="animate-bounce ease-linear"
        >
          Record your screen! <RecordIcon size="20px" className="ml-2" />
        </Button>
      )}
      {recordingStatus === RecordingStatus.RECORDING && (
        <Button onClick={handleRecordStop}>
          Stop recording <StopIcon size="20px" className="ml-2" />
        </Button>
      )}
      {recordingStatus === RecordingStatus.RECORDED && (
        <div className="flex flex-row gap-3">
          <Button onClick={handleDownloadRecording}>
            Download recording <DownloadIcon size="20px" className="ml-2" />
          </Button>
          <Button onClick={handleRecordStart}>
            Record another clip! <RecordIcon size="20px" className="ml-2" />
          </Button>
        </div>
      )}
    </>
  );
};

export default Controller;
