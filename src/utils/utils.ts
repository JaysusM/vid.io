import { formatDistance } from 'date-fns';

export const hash = async (str: string): Promise<string> => {
    const hash = await crypto.subtle
        .digest("SHA-256", new TextEncoder().encode(str));
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

export const isBlobLargerThanInMb = (file: Blob, size: number) => {
    const fileSizeInBytes = file.size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    return (fileSizeInMegabytes > size);
}

export const getDistanceDate = (date: string) => {
    if (!date) return '';
    return formatDistance(date, new Date(), { addSuffix: true })
}
