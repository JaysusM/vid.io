import { NextResponse } from 'next/server';
import { User, Video } from '@models/models';
import Database from '@utils/db';
import { AWS } from '@utils/aws';

export async function POST(request: Request): Promise<NextResponse> {
    await Database.connect();
    const { searchParams } = new URL(request.url);
    const videoName = searchParams.get('videoName');
    const userEmail = searchParams.get('userEmail');

    const user = await User.findOne({ email: userEmail });

    if (user) {
        const url = await AWS.uploadFile(videoName!, Buffer.from(await request.arrayBuffer()));

        const video = new Video({
            url: url,
            userId: user._id,
            name: videoName
        });

        await video.save();

        return NextResponse.json({ video });
    }

    return NextResponse.json({ status: 401 });
}