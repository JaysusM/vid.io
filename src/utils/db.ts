import mongoose from 'mongoose';

export class Database {
    private static instance: Database;
    private connection: mongoose.Connection;

    private constructor() {
        this.connection = mongoose.createConnection(
            process.env.MONGODB_URI as string,
        );
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    public getConnection(): mongoose.Connection {
        return this.connection;
    }
}

export default Database;


