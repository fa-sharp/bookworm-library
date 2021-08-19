import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import Library from "../model/Library";

/**
 * Hook for fetching and manipulating user's libraries from server
 * @returns 
 */
const useLibraryFetch = () => {

    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState<string>();

    const [libraries, setLibraries] = useState<Library[]>();
    const [fetchingError, setFetchingError] = useState(false);

    /** Get user's JWT token for Auth0 */
    useEffect(() => {
        if (!isAuthenticated)
            return;
        getAccessTokenSilently()
            .then(token => setToken(token))
            .catch(err => console.error(err));
    }, [getAccessTokenSilently, isAuthenticated]);


    /** Fetch the libraries from the server */
    useEffect(() => {
        if (!token)
            return;

        fetchLibraries(token)
            .then(libraries => setLibraries(libraries))
            .catch(err => setFetchingError(true));
        
    }, [token]);

    const addLibrary = useCallback((library: Library) => {
        if (!token || !libraries)
            return;
        
        addLibraryDB(token, library)
            .then(newLibrary => setLibraries([...libraries, newLibrary]))
            .catch(err => setFetchingError(true));

    }, [libraries, token])

    return { libraries, addLibrary };
}

const fetchLibraries = async (token: string): Promise<Library[]> => {
    try {
        const response = await fetch('/api/user', {
            headers: { Authorization: `Bearer ${token}`}
        });
        const { user: { libraries } } = await response.json();
        return libraries;
    } 
    catch (err) {
        console.error(err);
        throw new Error("Error fetching libraries from database.");
    }
}

const addLibraryDB = async (token: string, library: Library): Promise<Library> => {
    try {
        const response = await fetch('/api/library', 
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ library })
        });
        if (!response.ok)
            throw new Error("Error adding library to database.");
        
        const { message, library: newLibrary } = await response.json();
        console.log(message);
        return newLibrary;

    } catch (err) {
        console.error(err);
        throw err;
    }
}

export default useLibraryFetch;