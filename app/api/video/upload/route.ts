import { NextResponse } from 'next/server';
import { User, Video } from '@models/models';
import Database from '@utils/db';
import { AWS } from '@utils/aws';
import { getSession } from '@auth0/nextjs-auth0';


export async function POST(request: Request): Promise<NextResponse> {
    await Database.connect();
    const session = await getSession();

    const { searchParams } = new URL(request.url);
    const videoName = searchParams.get('videoName');
    const userEmail = searchParams.get('userEmail');

    let user;
    if (userEmail !== 'unknown')
        user = await User.findOne({ email: userEmail });

    if ((session && user && session.user.email === userEmail) || !user) {
        const key = user ? user.email + '/' + videoName! : 'temp/' + videoName!;
        const expirationDate = user ? undefined : new Date(Date.now() + 6 * 60 * 60 * 1000);
        await AWS.uploadFile(key, Buffer.from(await request.arrayBuffer()), expirationDate);

        const video = new Video({
            key,
            userId: user?._id,
            name: videoName,
            expiresAt: expirationDate,
        });

        await video.save();

        return NextResponse.json({ video });
    }

    return NextResponse.json({ status: 401 });
}