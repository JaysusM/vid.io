import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import Database from '@utils/db';

export async function POST(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const videoName = searchParams.get('videoName');
    const userEmail = searchParams.get('userEmail');

    const dbConnection = await Database.getInstance().getConnection();
    const user = await dbConnection.collection('users').findOne({ email: userEmail });

    if (user) {
        const blob = await put(videoName!, request.body!, {
            access: 'public',
        });

        const { insertedId } = await dbConnection.collection('videos').insertOne({
            url: blob.url,
            userId: user._id,
            name: videoName
        });

        const video = await dbConnection.collection('videos').findOne({ _id: insertedId });

        return NextResponse.json({ video });
    }

    return NextResponse.json({ status: 401 });
}