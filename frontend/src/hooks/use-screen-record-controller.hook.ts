import { useEffect, useState } from 'react';

interface ScreenRecordControllerParams {
    onStopRecording: () => void;
    onError: (error: string) => void;
}

const useScreenRecordController = ({ onStopRecording, onError }: ScreenRecordControllerParams): [() => void, () => void, string | undefined, boolean] => {

    const [media, setMedia] = useState<{ mediaStream: MediaStream, mediaRecorder: MediaRecorder }>();
    const [recordedVideoUrl, setRecordedVideoUrl] = useState<string>();
    const [canRecord, setCanRecord] = useState<boolean>(true);

    useEffect(() => {
        setCanRecord(!!navigator.mediaDevices.getDisplayMedia);
    }, []);

    useEffect(() => {
        const handleDataAvailable = (event: BlobEvent) => {
            setRecordedVideoUrl(URL.createObjectURL(event.data));
        };

        if (media?.mediaRecorder) {
            media.mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
        }

        return () => {
            if (media?.mediaRecorder) {
                media.mediaRecorder.removeEventListener('dataavailable', handleDataAvailable);
            }
        }
    }, [media?.mediaRecorder]);

    useEffect(() => {
        const stopCurrentRecording = () => {
            onStopRecording?.();
            media?.mediaRecorder?.stop()
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

    const stopRecord = () => {
        if (!media?.mediaStream?.getVideoTracks())
            throw new Error("Media is not defined");

        media.mediaRecorder.stop();
        media.mediaStream.getVideoTracks().forEach(track => track.stop());
    }

    return [startRecord, stopRecord, recordedVideoUrl, canRecord];

}

export default useScreenRecordController;