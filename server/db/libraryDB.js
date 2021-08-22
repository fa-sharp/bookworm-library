import { MongoSingleton } from "./mongoDB.js";
import Library from "../model/Library.js";
import { ObjectId } from "mongodb";

const USER_COLLECTION = 'users';

/**
 * 
 * @param {sting} authId The auth0 id of the user
 * @param {Library} library the new library (_id will be added)
 * @returns {Promise<Library | null>} the new library, with added _id, or null if there was a DB error
 */
export async function addLibrary(authId, library) {

    const db = await MongoSingleton.getLibraryDB();
    const newLibrary = { _id: ObjectId(), ...library };

    try {
        const result = await db.collection(USER_COLLECTION).updateOne(
            { authId }, { $push: { libraries: newLibrary } }
        );
        if (result.acknowledged && result.modifiedCount === 1) {
            console.log("Library added successfully!");
            return newLibrary;
        } else
            throw "Error adding library 😭";
    } catch (e) {
        console.error(e);
        return null;
    }
}

/**
 * 
 * @param {Library} library the library object to delete
 * @param {string} authId The auth0 id of the user
 */
 export async function deleteLibrary(authId, library) {
    const db = await MongoSingleton.getLibraryDB();

    try {
        const { _id } = library;
        const result = await db.collection(USER_COLLECTION).updateOne(
            { authId }, { $pull: { libraries: { _id: ObjectId(_id) }}}
        );
        
        if (result.acknowledged && result.modifiedCount === 1) {
            console.log("Library deleted successfully!");
            return true;
        } else
            throw "Error deleting library :(";
    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * 
 * @param {Library} library the library object to update - need _id and name
 * @param {string} authId The auth0 id of the user
 */
 export async function updateLibraryName(authId, library) {
    const db = await MongoSingleton.getLibraryDB();

    try {
        const { _id, name: newName } = library;
        const result = await db.collection(USER_COLLECTION).updateOne(
            { authId, "libraries._id": ObjectId(_id) }, { $set: {"libraries.$.name": newName } }
        );
        
        if (result.acknowledged && result.modifiedCount === 1) {
            console.log("Library updated successfully!");
            return true;
        } else
            throw "Error updating library :(";
    } catch (e) {
        console.error(e);
        return false;
    }
}