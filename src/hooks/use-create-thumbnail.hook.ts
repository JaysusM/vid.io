"use client";
const useCreateThumbnail = () => {

    const uploadThumbnail = async (fileBase64: string, videoId: string): Promise<void> => {
        await fetch(`/api/video/thumbnail?videoId=${videoId}`, {
            method: 'POST',
            body: fileBase64,
        });

        return;
    }

    const createThumbnail = async (blob: Blob, videoId: string): Promise<string> => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');

        await new Promise<void>((resolve, reject) => {
            video.addEventListener('loadedmetadata', () => {
                video.width = video.videoWidth;
                video.height = video.videoHeight;
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                video.currentTime = 1;
            });
            video.addEventListener('seeked', () => resolve());
            video.src = URL.createObjectURL(blob);
        });

        canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const videoBase64 = canvas.toDataURL('image/png');

        await uploadThumbnail(videoBase64, videoId);

        return videoBase64;
    }

    return [createThumbnail];
}

export default useCreateThumbnail;