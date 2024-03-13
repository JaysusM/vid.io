"use client";
import { useEffect, useState } from 'react';

interface ScreenRecordControllerParams {
    onStopRecording: (video: { file: Blob, url: string, name: string }) => void;
    onError: (error: string) => void;
}

const useScreenRecordController = ({ onStopRecording, onError }: ScreenRecordControllerParams): [() => void, () => void, boolean] => {
    const [media, setMedia] = useState<{ mediaStream: MediaStream, mediaRecorder: MediaRecorder }>();
    const [canRecord, setCanRecord] = useState<boolean>(true);

    useEffect(() => {
        setCanRecord(!!navigator.mediaDevices.getDisplayMedia);
    }, []);

    useEffect(() => {
        const handleDataAvailable = async (event: BlobEvent) => {
            onStopRecording?.({ file: event.data, url: URL.createObjectURL(event.data), name: `ScreenRecording_${new Date().getTime()}.webm` });
        };

        if (media?.mediaRecorder) {
            media.mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
        }

        return () => {
            if (media?.mediaRecorder) {
                media.mediaRecorder.removeEventListener('dataavailable', handleDataAvailable);
            }
        }
    }, [media?.mediaRecorder, onStopRecording]);

    useEffect(() => {
        const stopCurrentRecording = async () => {
            media?.mediaRecorder?.stop();
        };

        if (media?.mediaStream) {
            const [video] = media.mediaStream.getVideoTracks();
            video.addEventListener("ended", stopCurrentRecording);
        }

        return () => {
            if (media?.mediaStream) {
                const [video] = media.mediaStream.getVideoTracks();
                video.removeEventListener('ended', stopCurrentRecording);
            }
        }
    }, [media?.mediaStream, media?.mediaRecorder, onStopRecording]);

    const startRecord = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getDisplayMedia({
                video: { frameRate: { ideal: 30 } },
                audio: true
            });

            const mediaRecorder = new MediaRecorder(mediaStream, {
                mimeType: 'video/webm;codecs=vp8,opus'
            });

            mediaRecorder.start();
            setMedia({ mediaStream, mediaRecorder });
        } catch (error) {
            onError?.((error as Error).message);
        }
    }

    const stopRecord = async () => {
        if (!media?.mediaStream?.getVideoTracks())
            throw new Error("Media is not defined");

        media.mediaRecorder.stop();
        media.mediaStream.getVideoTracks().forEach(track => track.stop());
    }

    return [startRecord, stopRecord, canRecord];

}

export default useScreenRecordController;