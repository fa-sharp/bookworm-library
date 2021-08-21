import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import Book from "../model/Book";
import Library from "../model/Library";
import useBookDBRequests from "./useBookDB";
import useLibraryDBRequests from "./useLibraryDB";

/**
 * Hook for fetching and manipulating user's libraries from server
 */
const useLibraryFetch = () => {

    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState<string>();

    const [libraries, setLibraries] = useState<Library[]>();

    const { fetchLibrariesDB, addLibraryDB, deleteLibraryDB } = useLibraryDBRequests(token);
    const { addBookDB, deleteBookDB, updateBookDB } = useBookDBRequests(token);
    const [fetchingError, setFetchingError] = useState(false);

    /** Get user's JWT token for Auth0 */
    useEffect(() => {
        if (!isAuthenticated)
            return;
        getAccessTokenSilently()
            .then(token => setToken(token))
            .catch(err => console.error(err));
    }, [getAccessTokenSilently, isAuthenticated]);


    /** If there's a JWT token, fetch the libraries from the server */
    useEffect(() => {
        if (!token)
            return;

        fetchLibrariesDB()
            .then(libraries => {
                setLibraries(libraries);
            })
            .catch(err => setFetchingError(true));
        
    }, [fetchLibrariesDB, token]);

    const addLibrary = useCallback((library: Library) => {
        if (!libraries)
            return;
        
        addLibraryDB(library)
            .then(newLibrary => setLibraries([...libraries, newLibrary]))
            .catch(err => setFetchingError(true));

    }, [addLibraryDB, libraries]);

    const deleteLibrary = useCallback((libraryIndex: number) => {
        if (!libraries)
            return;

        deleteLibraryDB(libraries[libraryIndex])
            .then(success => {
                const newLibraries = [...libraries];
                newLibraries.splice(libraryIndex, 1);
                setLibraries(newLibraries);
            })
            .catch(err => setFetchingError(true));
        
    }, [deleteLibraryDB, libraries]);

    

    const addBook = useCallback((libraryIndex: number, book: Book) => {
        if (!libraries)
            return;

        addBookDB(libraries[libraryIndex], book)
            .then(newBook => {
                const newLibraries = [...libraries];
                newLibraries[libraryIndex].books.push(newBook);
                setLibraries(newLibraries);
            })
            .catch(err => setFetchingError(true));
    }, [addBookDB, libraries]);

    const deleteBook = useCallback((libraryIndex: number, bookIndex: number) => {
        if (!libraries)
            return;

        deleteBookDB(libraries[libraryIndex], libraries[libraryIndex].books[bookIndex])
            .then(success => {
                const newLibraries = [...libraries];
                newLibraries[libraryIndex].books.splice(bookIndex, 1);
                setLibraries(newLibraries);
            })
            .catch(err => setFetchingError(true));
    }, [deleteBookDB, libraries]);

    const updateBook = useCallback((libraryIndex: number, bookIndex: number, updatedBook: Book) => {
        if (!libraries)
            return;
        
        // Update book in state, before sending request
        const prevBook = libraries[libraryIndex].books[bookIndex];
        const newLibraries = [...libraries];
        newLibraries[libraryIndex].books[bookIndex] = updatedBook;
        setLibraries(newLibraries);

        updateBookDB(libraries[libraryIndex], updatedBook)
            .then(success => {

            })
            .catch(err => { // if failed, revert the update
                setFetchingError(true);
                const newLibraries = [...libraries];
                newLibraries[libraryIndex].books[bookIndex] = prevBook;
                setLibraries(newLibraries);
            });
    }, [libraries, updateBookDB]);

    return { libraries, addLibrary, deleteLibrary, addBook, deleteBook, updateBook, fetchingError };
}

export default useLibraryFetch;