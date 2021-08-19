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

        if (result.acknowledged)
            return { _id: result.insertedId.toHexString(), ...newUser }
        else
            throw new Error("Failed to add user to database!");
    } catch (e) {
        console.error(e);
    }
}
