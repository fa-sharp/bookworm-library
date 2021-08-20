import { MongoSingleton, USER_COLLECTION } from "./mongoDB.js";
import Book from '../model/Book.js';
import { ObjectId } from "mongodb";

/**
 * @param authId The auth0 id of the user
 * @param {{_id: string}} library the library to add to (only need _id)
 * @param {Book} book the book to add (_id will be added)
 * 
 * @returns {Promise<Book | null>} the new book, with added _id, or null if there was a DB error
 */
export async function addBook(authId, library, book) {

    const db = await MongoSingleton.getLibraryDB();
    const newBook = { _id: ObjectId(), ...book };

    try {
        const filter = { authId, "libraries._id": ObjectId(library._id) };
        const updater = { $push: { "libraries.$.books": newBook } };
        const result = await db.collection(USER_COLLECTION).updateOne(filter, updater);
        
        if (result.acknowledged && result.modifiedCount === 1) {
            console.log("Book added successfully!");
            return newBook;
        } else
            throw "Error adding book :(";
    } catch (e) {
        console.error(e);
        return null;
    }
}

/**
 * 
 * @param authId The auth0 id of the user
 * @param {{_id: string}} library the library to delete from (only need _id)
 * @param {{_id: string}} book the book to delete (only need _id)
 * 
 */
export async function deleteBook(authId, library, book) {
    const db = await MongoSingleton.getLibraryDB();

    try {
        const filter = { authId, "libraries._id": ObjectId(library._id) };
        const updater = { $pull: { "libraries.$.books": { _id: ObjectId(book._id) } } };
        const result = await db.collection(USER_COLLECTION).updateOne(filter, updater);

        if (result.acknowledged && result.modifiedCount === 1) {
            console.log("Book deleted successfully!");
            return true;
        }
        else
            throw "Error deleting book :(";
    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * 
 * @param authId The auth0 id of the user
 * @param {{_id: string}} library the library to update from (only need _id)
 * @param {Book} book the book to update (same _id but updated fields)
 * @returns 
 */
 export async function updateBook(authId, library, book) {
    const db = await MongoSingleton.getLibraryDB();
    const updatedBook = {  ...book, _id: ObjectId(book._id)};

    try {
        const filter = { authId };
        const updater = { $set: { "libraries.$[l].books.$[b]": updatedBook } };
        const options = { arrayFilters: [ { "l._id": ObjectId(library._id) } , { "b._id": updatedBook._id } ] }

        const result = await db.collection(USER_COLLECTION).updateOne(filter, updater, options);

        if (result.acknowledged && result.modifiedCount === 1) {
            console.log(`Book ${book.title} updated successfully!`);
            return true;
        }
        else
            throw "Error updating book :(";
    } catch (e) {
        console.error(e);
        return false;
    }
}

