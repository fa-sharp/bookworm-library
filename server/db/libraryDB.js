import { LIB_COLLECTION, MongoSingleton } from "./mongoDB.js";

export async function getLibraries() {

    const db = await MongoSingleton.getLibraryDB();
    let libraries = [];

    try {
        let foundLibraries = db.collection(LIB_COLLECTION)
                                    .find()
                                    .map(doc => doc.name);
        libraries = await foundLibraries.toArray();
    } catch (e) {
        console.error(e);
    }
    return libraries;
}

export async function addLibrary(library) {

    const db = await MongoSingleton.getLibraryDB();

    try {
        const result = await db.collection(LIB_COLLECTION).insertOne(library);
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