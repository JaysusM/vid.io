import { useUser } from '@auth0/nextjs-auth0/client';
import { useVideoContext } from '@context/video-context.provider';
import { isBlobLargerThanInMb } from '@utils/utils';

const MAXIMUM_FILE_SIZE = 100;

const useCanUploadFile = (): ['yes' | 'no' | 'limited', string | undefined] => {
    const [video] = useVideoContext();
    const { user } = useUser();

    if (!user) return ['limited', undefined];
    if (!video?.file) return ['no', "No video to upload"];
    if (isBlobLargerThanInMb(video?.file, MAXIMUM_FILE_SIZE)) return ['no', "Video is too large to upload"];
    return ['yes', undefined];
}

export default useCanUploadFile;