import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import Database from '@utils/db';

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (
                _pathname: string,
                clientPayload: string | null,
                _multipart: boolean
            ) => {
                return {
                    allowedContentTypes: ['video/webm'],
                    tokenPayload: clientPayload,
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                const db = await Database.getInstance();
                const user = await db.getConnection().collection('users').findOne({ email: tokenPayload });
                if (user) {
                    db.getConnection().collection('videos').insertOne({
                        url: blob.url,
                        userId: user._id,
                    });
                }
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 },
        );
    }
}