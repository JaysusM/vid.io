import { useUser } from '@auth0/nextjs-auth0/client';
import { useVideoContext } from '@context/video-context.provider';
import { isBlobLargerThanInMb } from '@utils/utils';

const useCanUploadFile = (): [boolean, string | undefined] => {
    const [video] = useVideoContext();
    const { user } = useUser();

    if (!user) return [false, "You need to be logged in to upload a video"];
    if (!video?.file) return [false, "No video to upload"];
    if (isBlobLargerThanInMb(video?.file, 20)) return [false, "Video is too large to upload"];
    return [true, undefined];
}

export default useCanUploadFile;