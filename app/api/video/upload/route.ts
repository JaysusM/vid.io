import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { User, Video } from '@models/models';
import Database from '@utils/db';

export async function POST(request: Request): Promise<NextResponse> {
    await Database.connect();
    const { searchParams } = new URL(request.url);
    const videoName = searchParams.get('videoName');
    const userEmail = searchParams.get('userEmail');

    const user = await User.findOne({ email: userEmail });

    if (user) {
        const blob = await put(videoName!, request.body!, {
            access: 'public',
        });

        const video = new Video({
            url: blob.url,
            userId: user._id,
            name: videoName
        });

        await video.save();

        return NextResponse.json({ video });
    }

    return NextResponse.json({ status: 401 });
}