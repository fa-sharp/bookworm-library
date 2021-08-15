import dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';
import Book from '../model/Book.js';

if (process.env.NODE_ENV !== 'production')
    dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lue6u.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const MongoSingleton = (() => {
    let _mongoClient;
    let _db;

    function isInitialized() {
        return (_mongoClient !== undefined);
    }

    /**
     * 
     * @returns {Promise<Db>} The library database
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
    
    const testUser = {name: "Bobby"};

    try {
        const books = await getBooks(testUser);
        console.log("Connected successfully! Current books: ");
        console.log(books);
    } catch (e) {
        console.error(e);
    }
}

export async function closeDBConnection() {
    await MongoSingleton.closeMongoClient();
}

/**
 * 
 * @param {{name: string}} user 
 * @return {Promise<Book[] | null>}
 */
export async function getBooks(user) {

    const db = await MongoSingleton.getLibraryDB();
    let books = null;

    try {
        let retrievedUser = await db.collection("users").find(user).next();
        books = retrievedUser.books;
    } catch (e) {
        console.error(e);
    }
    return books;
}

/**
 * 
 * @param {{name: string}} user 
 * @param {Book} newBook 
 */
export async function addBook(user, newBook) {

    const db = await MongoSingleton.getLibraryDB();

    try {
        const updater = { $push: { books: newBook } };
        const result = await db.collection("users").findOneAndUpdate(user, updater);
        console.log(result.ok ? "Book added successfully!" : "Book not added 😭");

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * 
 * @param {{name: string}} user 
 * @param {number} bookIndex 
 * @returns 
 */
export async function deleteBook(user, bookIndex) {
    const db = await MongoSingleton.getLibraryDB();

    try {
        const { books } = await db.collection("users").findOne(user);

        if (bookIndex >= books.length || bookIndex < 0)
            throw "Error deleting book from DB: Invalid book index!";

        books.splice(bookIndex, 1);
        const updater = { $set: {books: books} };

        const result = await db.collection("users").findOneAndUpdate(user, updater);
        console.log(result.ok ? "Book deleted successfully!" : "Book not deleted :(");

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}


/**
 * 
 * @param {{name: string}} user 
 * @param {number} bookIndex 
 * @param {Book} updatedBook
 * @returns 
 */
 export async function updateBook(user, bookIndex, updatedBook) {
    const db = await MongoSingleton.getLibraryDB();

    try {
        const { books } = await db.collection("users").findOne(user);

        if (bookIndex >= books.length || bookIndex < 0)
            throw "Error updating book from DB: Invalid book index!";

        books[bookIndex] = updatedBook;
        const updater = { $set: {books: books} };

        const result = await db.collection("users").findOneAndUpdate(user, updater);
        console.log(result.ok ? "Book updated successfully!" : "Book not updated :(");

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}