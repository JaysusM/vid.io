import mongoose from 'mongoose';

export interface VideoModel {
    key: string;
    userId: string;
    name: string;
    thumbnail: string;
    createdAt: Date;
    expiresAt?: Date;
}

const videoSchema = new mongoose.Schema({
    key: String,
    userId: String,
    name: String,
    thumbnail: String,
    expiresAt: Date,
}, { timestamps: true });

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

export default Video;