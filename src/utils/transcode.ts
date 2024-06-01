import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// This method uses temporary files to convert the video from webm to mp4
export const transcodeToMP4 = async (file: Blob): Promise<Buffer> => {
    const inputPath = `${uuidv4()}.webm`;
    const outputPath = `${uuidv4()}.mp4`;

    const fileBuffer = await file.arrayBuffer();
    fs.writeFileSync(inputPath, Buffer.from(fileBuffer));

    await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .output(outputPath)
            .on('end', resolve)
            .on('error', reject)
            .run();
    });

    const outputBuffer = fs.readFileSync(outputPath);

    // Delete the temporary files
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);

    return outputBuffer;
};