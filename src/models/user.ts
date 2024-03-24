import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    nickname: String,
    email: String,
    picture: String,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;