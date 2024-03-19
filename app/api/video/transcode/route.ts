import { transcodeToMP4 } from '@utils/transcode';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get("file") as Blob;
    if (!file) return new NextResponse(JSON.stringify({ error: 'No file provided' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

    try {
        const buffer = await transcodeToMP4(file);

        return new NextResponse(buffer, { status: 200, headers: { 'Content-Type': 'video/mp4' } });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Error during transcoding' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}