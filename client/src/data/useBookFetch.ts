import { useCallback, useEffect, useState } from "react";
import Book from "../model/Book";
import Library from "../model/Library";


const useBookFetch = (library: Library | null) => {

    const [books, setBooks] = useState<Book[]>();

    useEffect(() => {
        if (!library)
            return;

        setBooks(library.books);
    }, [library]);

    const addBook = useCallback((book: Book) => {
        if (!books) return;

        setBooks([...books, book]);

        fetch(`/books/${library}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ book })
            }
        ).then(res => res.json().then(console.log))
        .catch(err => console.error);
    }, [books, library]);

    const deleteBook = useCallback((bookIndex: number) => {
        if (!books) return;

        const newBooks = [...books];
        newBooks.splice(bookIndex, 1);

        setBooks(newBooks);

        fetch(`/books/${library}/${bookIndex}`,
            {
                method: "DELETE"
            })
        .then(res => res.json().then(console.log))
        .catch(err => console.error);
    }, [books, library]);

    const toggleBookRead = useCallback((bookToUpdate: Book, bookIndex: number) => {
        if (!books) return;

        bookToUpdate.read = !bookToUpdate.read;
        const newBooks = [...books];
        newBooks[bookIndex] = bookToUpdate;

        setBooks(newBooks);

        fetch(`/books/${library}/${bookIndex}`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ book: bookToUpdate })
            })
        .then(res => res.json().then(console.log))
        .catch(err => console.error);
    }, [books, library]);

    return { books, addBook, deleteBook, toggleBookRead }
}

export default useBookFetch;