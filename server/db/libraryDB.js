import { MongoSingleton } from "./mongoDB.js";
import Library from "../model/Library.js";

const USER_COLLECTION = 'users';

/**
 * 
 * @param {string} authId The unique (hopefully) ID corresponding to the auth0 authentication
 * @returns {Promise<Library[] | null>}
 */
export async function getLibraries(authId) {

    const db = await MongoSingleton.getLibraryDB();

    try {
        const { libraries } = await db.collection(USER_COLLECTION)
                                    .findOne({authId});
        return libraries;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function addLibrary(authId, newLibrary) {

    const db = await MongoSingleton.getLibraryDB();

    try {
        const result = await db.collection(USER_COLLECTION).updateOne(
            { authId }, { $push: { libraries: newLibrary } }
        );
        if (result.acknowledged) {
            console.log("Library added successfully!");
            return true;
        } else
            throw "Library not added 😭";
    } catch (e) {
        console.error(e);
        return false;
    }
}