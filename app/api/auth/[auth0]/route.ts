import { handleAuth } from '@auth0/nextjs-auth0';
import Database from '@utils/db';

export const GET = handleAuth();

exports.onExecutePostLogin = async (event: any, _: any) => {
    const { user } = event;
    const db = await Database.getInstance();

    db.getConnection().collection('users').findOneAndReplace({
        email: user.email
    }, {
        name: user.name,
        nickname: user.nickname,
    }, {
        upsert: true
    });
}
