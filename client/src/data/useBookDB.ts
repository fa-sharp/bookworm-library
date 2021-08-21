import { useCallback } from "react";
import Book from "../model/Book";
import Library from "../model/Library";

const BOOK_API = '/api/book';

const useBookDBRequests = (token: string | undefined) => {

    const noTokenError = () => { throw new Error("Error creating book DB request: No access token provided!") };


    const addBookDB = useCallback(async (library: Library, book: Book): Promise<Book> => {
        if (!token)
            noTokenError();

        try {
            const response = await fetch(BOOK_API, 
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ library: { _id: library._id }, book })
            });
            if (!response.ok)
                throw new Error("Error adding book to database.");
            
            const { message, book: newBook } = await response.json();
            console.log(message);
            return newBook;
    
        } catch (err) {
            console.error(err);
            throw err;
        }
    }, [token]);

    const deleteBookDB = useCallback(async (library: Library, book: Book): Promise<boolean> => {
        if (!token)
            noTokenError();

        try {
            const response = await fetch(BOOK_API, 
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ library: { _id: library._id }, book: {_id: book._id} })
            });
            if (!response.ok)
                throw new Error("Error deleting book from database.");
            
            const { message } = await response.json();
            console.log(message);
            return true;
    
        } catch (err) {
            console.error(err);
            throw err;
        }
    }, [token]);

    return { addBookDB, deleteBookDB };
}

export default useBookDBRequests;