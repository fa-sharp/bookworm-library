import dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';

if (process.env.NODE_ENV !== 'production')
    dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lue6u.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export const USER_COLLECTION = "users";

export const MongoSingleton = (() => {
    let _mongoClient;
    let _db;

    function isInitialized() {
        return (_mongoClient !== undefined);
    }

    /**
     * 
     * @returns {Promise<Db>} The library app database
     */
    async function getLibraryDB() {
        if (isInitialized()) return _db;

        console.log("Connecting to database!");
        _mongoClient = new MongoClient(uri, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });

        try {
            await _mongoClient.connect();
            _db = _mongoClient.db();
        } catch (e) {
            await _mongoClient.close();
            console.error(e);
        }

        return _db;
    }

    async function closeMongoClient() {
        if (isInitialized())
            await _mongoClient.close();
    }

    return { getLibraryDB, closeMongoClient }
})();

export async function connectToDB() {

    try {
        const db = await MongoSingleton.getLibraryDB();
        console.log(`Connected successfully to database '${db.databaseName}'`);
    } catch (e) {
        console.error(e);
    }
}

export async function closeDBConnection() {
    await MongoSingleton.closeMongoClient();
}
