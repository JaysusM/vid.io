"use client";
import useScreenRecordController from "@hooks/use-screen-record-controller.hook";
import { Button } from "@ui/button";
import { useState } from "react";
import { DownloadIcon, RecordIcon, StopIcon } from "ui/icons";

enum RecordingStatus {
  NONE = "NONE",
  RECORDING = "RECORDING",
  RECORDED = "RECORDED",
}

const Controller = () => {
  const [startRecord, stopRecord, media] = useScreenRecordController({
    onStopRecording: () => {
      setRecordingStatus(RecordingStatus.RECORDED);
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

  return (
    <>
      {recordingStatus === RecordingStatus.NONE && (
        <Button
          onClick={handleRecordStart}
          className="animate-bounce ease-linear max-w-fit self-center hover:pointer"
        >
          Record your screen! <RecordIcon size="20px" className="ml-2" />
        </Button>
      )}
      {recordingStatus === RecordingStatus.RECORDING && (
        <Button
          onClick={handleRecordStop}
          className="max-w-fit self-center hover:pointer"
        >
          Stop recording <StopIcon size="20px" className="ml-2" />
        </Button>
      )}
      {recordingStatus === RecordingStatus.RECORDED && (
        <div className="flex flex-row self-center gap-3">
          <Button
            onClick={handleDownloadRecording}
            className="max-w-fit self-center hover:pointer"
          >
            Download recording <DownloadIcon size="20px" className="ml-2" />
          </Button>
          <Button
            onClick={handleRecordStart}
            className="ease-linear max-w-fit self-center hover:pointer"
          >
            Record another clip! <RecordIcon size="20px" className="ml-2" />
          </Button>
        </div>
      )}
    </>
  );
};

export default Controller;
