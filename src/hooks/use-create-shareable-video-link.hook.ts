import { UserProfile } from '@auth0/nextjs-auth0/client';
import { hash } from '@utils/utils';
import { useState } from 'react';

const useCreateShareableVideoLink = (user: UserProfile | undefined): [(blob: Blob) => Promise<string>, { isCreatingLink: boolean }] => {
    const [isCreatingLink, setIsCreatingLink] = useState<boolean>(false);

    const createShareableVideoLink = async (recordedVideo: Blob) => {
        setIsCreatingLink(true);
        const dateTimestamp = new Date().getTime();
        if (!user)
            throw new Error('User not found');

        const emailHash = await hash(user.email!);
        const blobName = `ScreenRecording_${emailHash}_${dateTimestamp}.webm`;
        const uploadUrl = `/api/upload-video?videoName=${blobName}&userEmail=${user.email}`;
        const uploadedVideo = await fetch(uploadUrl, {
            method: 'POST',
            body: recordedVideo
        });

        const { video } = await uploadedVideo.json();
        setIsCreatingLink(false);
        return `${window.location.origin}/video/${video._id}`;
    };

    return [createShareableVideoLink, { isCreatingLink }];
}

export default useCreateShareableVideoLink;