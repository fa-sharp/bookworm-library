import { LIB_COLLECTION, MongoSingleton } from "./mongoDB.js";
import Book from '../model/Book.js';


/**
 * 
 * @param {{name: string}} library 
 * @return {Promise<Book[] | null>}
 */
 export async function getBooks(library) {

    const db = await MongoSingleton.getLibraryDB();
    let books = null;

    try {
        let retrievedUser = await db.collection(LIB_COLLECTION).find(library).next();
        books = retrievedUser.books;
    } catch (e) {
        console.error(e);
    }
    return books;
}

/**
 * 
 * @param {{name: string}} library 
 * @param {Book} newBook 
 */
export async function addBook(library, newBook) {

    const db = await MongoSingleton.getLibraryDB();

    try {
        const updater = { $push: { books: newBook } };
        const result = await db.collection(LIB_COLLECTION).findOneAndUpdate(library, updater);
        console.log(result.ok ? "Book added successfully!" : "Book not added 😭");

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * 
 * @param {{name: string}} library 
 * @param {number} bookIndex 
 * @returns 
 */
export async function deleteBook(library, bookIndex) {
    const db = await MongoSingleton.getLibraryDB();

    try {
        const { books } = await db.collection(LIB_COLLECTION).findOne(library);

        if (bookIndex >= books.length || bookIndex < 0)
            throw "Error deleting book from DB: Invalid book index!";

        books.splice(bookIndex, 1);
        const updater = { $set: {books: books} };

        const result = await db.collection(LIB_COLLECTION).findOneAndUpdate(library, updater);
        console.log(result.ok ? "Book deleted successfully!" : "Book not deleted :(");

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}


/**
 * 
 * @param {{name: string}} library 
 * @param {number} bookIndex 
 * @param {Book} updatedBook
 * @returns 
 */
 export async function updateBook(library, bookIndex, updatedBook) {
    const db = await MongoSingleton.getLibraryDB();

    try {
        const { books } = await db.collection(LIB_COLLECTION).findOne(library);

        if (bookIndex >= books.length || bookIndex < 0)
            throw "Error updating book from DB: Invalid book index!";

        books[bookIndex] = updatedBook;
        const updater = { $set: {books: books} };

        const result = await db.collection(LIB_COLLECTION).findOneAndUpdate(library, updater);
        console.log(result.ok ? "Book updated successfully!" : "Book not updated :(");

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

