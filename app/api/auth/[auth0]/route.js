import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import Database from '@utils/db';

const afterCallback = async (req, session, state) => {
    const { user } = session;
    const db = await Database.getInstance();

    await db.getConnection().collection('users').findOneAndReplace({
        email: user.email
    }, {
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        picture: user.picture,
    }, {
        upsert: true
    });

    return session;
};

export const GET = handleAuth({
    callback: handleCallback({ afterCallback })
});
