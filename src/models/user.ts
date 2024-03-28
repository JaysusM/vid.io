import mongoose from 'mongoose';

export interface UserModel {
    name: string;
    nickname: string;
    email: string;
    picture: string;
}

const userSchema = new mongoose.Schema({
    name: String,
    nickname: String,
    email: String,
    picture: String,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;