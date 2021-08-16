import { useCallback, useEffect, useState } from "react";
import Book from "../model/Book";


const useBookFetch = (libName: string | null) => {

    const [books, setBooks] = useState<Book[]>();

    useEffect(() => {
        if (!libName)
            return;

        fetch(`/books/${libName}`)
        .then((res) => res.json())
        .then((data) => setBooks(data.books))
        .catch(console.error);
    }, [libName]);

    const addBook = useCallback((book: Book) => {
        if (!books) return;

        setBooks([...books, book]);

        fetch(`/books/${libName}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ book })
            }
        ).then(res => res.json().then(console.log))
        .catch(err => console.error);
    }, [books, libName]);

    const deleteBook = useCallback((bookIndex: number) => {
        if (!books) return;

        const newBooks = [...books];
        newBooks.splice(bookIndex, 1);

        setBooks(newBooks);

        fetch(`/books/${libName}/${bookIndex}`,
            {
                method: "DELETE"
            })
        .then(res => res.json().then(console.log))
        .catch(err => console.error);
    }, [books, libName]);

    const toggleBookRead = useCallback((bookToUpdate: Book, bookIndex: number) => {
        if (!books) return;

        bookToUpdate.read = !bookToUpdate.read;
        const newBooks = [...books];
        newBooks[bookIndex] = bookToUpdate;

        setBooks(newBooks);

        fetch(`/books/${libName}/${bookIndex}`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ book: bookToUpdate })
            })
        .then(res => res.json().then(console.log))
        .catch(err => console.error);
    }, [books, libName]);

    return { books, addBook, deleteBook, toggleBookRead }
}

export default useBookFetch;