import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class AWS {
    public static s3Client = new S3Client({ region: 'eu-west-3' });

    public static async uploadFile(key: string, body: Buffer, expirationDate?: Date) {
        try {
            const command = new PutObjectCommand({
                Bucket: 'vidios',
                Key: key,
                Body: body,
                ContentType: 'video/mp4',
                Expires: expirationDate,
            });
            await this.s3Client.send(command);
            return true;
        } catch (error) {
            console.error('Error uploading file: ', error);
            throw error;
        }
    }

    public static async getFile(key: string) {
        try {
            const url = getSignedUrl(this.s3Client, new GetObjectCommand({
                Bucket: 'vidios',
                Key: key,
            }));
            return url;
        } catch (error) {
            console.error('Error getting file: ', error);
            throw error;
        }
    }
}