import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { User } from '@models/models';
import Database from '@utils/db';

const afterCallback = async (req, session, state) => {
    await Database.connect();
    const { user } = session;

    await User.findOneAndUpdate({
        email: user.email
    }, {
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        picture: user.picture,
    }, { upsert: true });

    return session;
};

export const GET = handleAuth({
    callback: handleCallback({ afterCallback })
});
