import mongoose from 'mongoose';

export interface VideoModel {
    key: string;
    userId: string;
    name: string;
    createdAt: Date;
}

const videoSchema = new mongoose.Schema({
    key: String,
    userId: String,
    name: String,
}, { timestamps: true });

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

export default Video;