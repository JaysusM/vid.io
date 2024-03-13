import mongoose from 'mongoose';

export class Database {
    private static instance: Database;

    public static async connect(): Promise<void> {
        if (Database.instance) return;

        Database.instance = new Database();
        await mongoose.connect(
            process.env.MONGODB_URI as string,
        );
    }
}

export default Database;


