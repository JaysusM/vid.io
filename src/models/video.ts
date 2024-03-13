import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    url: String,
    userId: String,
    name: String
});

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

export default Video;