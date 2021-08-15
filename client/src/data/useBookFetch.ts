import { useCallback, useEffect, useState } from "react";
import Book from "../model/Book";


const useBookFetch = () => {

    const [books, setBooks] = useState<Book[]>();

    useEffect(() => {
        fetch("/books")
            .then((res) => res.json())
            .then((data) => setBooks(data.books))
            .catch(console.error);
    }, []);

    const addBook = useCallback((book: Book) => {
        if (!books) return;

        setBooks([...books, book]);

        fetch("/books",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ book })
            }
        ).then(console.log, console.error);
    }, [books]);

    const deleteBook = useCallback((bookIndex: number) => {
        if (!books) return;

        const newBooks = [...books];
        newBooks.splice(bookIndex, 1);

        setBooks(newBooks);

        fetch(`/books/${bookIndex}`,
            {
                method: "DELETE"
            })
        .then(res => res.json().then(console.log))
        .catch(err => console.error);
    }, [books]);

    const toggleBookRead = useCallback((bookToUpdate: Book, bookIndex: number) => {
        if (!books) return;

        bookToUpdate.read = !bookToUpdate.read;
        const newBooks = [...books];
        newBooks[bookIndex] = bookToUpdate;

        setBooks(newBooks);

        fetch(`/books/${bookIndex}`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ book: bookToUpdate })
            });
    }, [books]);

    return { books, addBook, deleteBook, toggleBookRead }
}

export default useBookFetch;