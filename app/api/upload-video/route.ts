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
                clientPayload: string
            ) => {
                return {
                    allowedContentTypes: ['video/webm'],
                    tokenPayload: clientPayload,
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                await Database.getInstance().getConnection().collection('videos').insertOne({
                    url: blob.url,
                    ...JSON.parse(tokenPayload as string),
                });
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