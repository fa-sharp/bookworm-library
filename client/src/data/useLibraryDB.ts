import { useCallback } from "react";
import Library from "../model/Library";

const useLibraryDBRequests = (token: string | undefined) => {
    
    const noTokenError = () => { throw new Error("Error creating library DB request: No access token provided!") };


    const fetchLibrariesDB = useCallback(async (): Promise<Library[]> => {
        try {
            if (!token)
                noTokenError();

            const response = await fetch('/api/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { user: { libraries } } = await response.json();
            return libraries;
        } 
        catch (err) {
            console.error(err);
            throw new Error("Error fetching libraries from database.");
        }
    }, [token]);

    const addLibraryDB = useCallback(async (library: Library): Promise<Library> => {
        try {
            if (!token)
                noTokenError();

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
    }, [token]);

    /** Updates only the name of the library */
    const updateLibraryDB = useCallback(async (library: Library): Promise<boolean> => {
        try {
            if (!token)
                noTokenError();

            const response = await fetch('/api/library', 
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ library: { _id: library._id, name: library.name } })
            });
            if (!response.ok)
                throw new Error("Error updating library in database.");
            
            const { message } = await response.json();
            console.log(message);
            return true;
    
        } catch (err) {
            console.error(err);
            throw err;
        }
    }, [token]);

    const deleteLibraryDB = useCallback(async (library: Library): Promise<boolean> => {
        try {
            if (!token)
                noTokenError();

            const response = await fetch('/api/library', 
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ library: { _id: library._id } })
            });
            if (!response.ok)
                throw new Error("Error deleting library from database.");
            
            const { message } = await response.json();
            console.log(message);
            return true;
    
        } catch (err) {
            console.error(err);
            throw err;
        }
    }, [token]);

    return { fetchLibrariesDB, addLibraryDB, updateLibraryDB, deleteLibraryDB }
}

export default useLibraryDBRequests;