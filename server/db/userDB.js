import { MongoSingleton } from "./mongoDB.js";
import User from "../model/User.js";

const USER_COLLECTION = 'users';

export async function getUser(authId) {

    const db = await MongoSingleton.getLibraryDB();

    try {
        const user = await db.collection(USER_COLLECTION)
                                    .findOne({authId});
        return user;
    } catch (e) {
        return null;
    }
}


export async function addUser(authId) {

    const db = await MongoSingleton.getLibraryDB();

    try {

        const newUser = new User(authId);
        const result = await db.collection(USER_COLLECTION).insertOne(newUser);

        return result.acknowledged ? newUser : null;
        
    } catch (e) {
        throw new Error("Failed to add user to database!");
    }
}
