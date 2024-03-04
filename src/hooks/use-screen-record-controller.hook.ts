"use client";
import { useCallback, useEffect, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { useUser } from '@auth0/nextjs-auth0/client';

interface ScreenRecordControllerParams {
    onStopRecording: () => void;
    onError: (error: string) => void;
}

const useScreenRecordController = ({ onStopRecording, onError }: ScreenRecordControllerParams): [() => void, () => void, { url: string, name: string } | undefined, boolean] => {

    const [media, setMedia] = useState<{ mediaStream: MediaStream, mediaRecorder: MediaRecorder }>();
    const [video, setVideo] = useState<{ url: string, name: string }>();
    const [canRecord, setCanRecord] = useState<boolean>(true);
    const { user } = useUser();

    const triggerVideoUpload = useCallback(async (recordedVideo: Blob) => {
        if (user) {
            const blobName = `${user.email || user.nickname}${user.name}_${Date.now()}`;
            const newBlob = await upload(blobName, recordedVideo as Blob, {
                access: 'public',
                contentType: 'video/webm',
                handleUploadUrl: '/api/upload-video',
                clientPayload: JSON.stringify({ email: user.email, name: user.name, nickname: user.nickname })
            });
            console.log({ newBlob });
            setVideo({ url: newBlob.url, name: blobName });
        } else if (recordedVideo) {
            setVideo({ url: URL.createObjectURL(recordedVideo), name: `vidio_${new Date().getTime()}.webm` });
        }
    }, [user]);

    useEffect(() => {
        setCanRecord(!!navigator.mediaDevices.getDisplayMedia);
    }, []);

    useEffect(() => {
        const handleDataAvailable = async (event: BlobEvent) => {
            await triggerVideoUpload(event.data);
        };

        if (media?.mediaRecorder) {
            media.mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
        }

        return () => {
            if (media?.mediaRecorder) {
                media.mediaRecorder.removeEventListener('dataavailable', handleDataAvailable);
            }
        }
    }, [media?.mediaRecorder, triggerVideoUpload]);

    useEffect(() => {
        const stopCurrentRecording = async () => {
            onStopRecording?.();
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
    }, [media?.mediaStream, media?.mediaRecorder, onStopRecording, triggerVideoUpload]);

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

    return [startRecord, stopRecord, video, canRecord];

}

export default useScreenRecordController;