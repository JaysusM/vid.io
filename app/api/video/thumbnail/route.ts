import { NextResponse } from 'next/server';
import { Video } from '@models/models';
import Database from '@utils/db';

export async function POST(request: Request): Promise<NextResponse> {
    await Database.connect();
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');

    await Video.updateOne({ _id: videoId }, {
        thumbnail: await request.text(),
    });

    return NextResponse.json({ status: 200 });
}