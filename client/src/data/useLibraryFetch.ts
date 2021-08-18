import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import Library from "../model/Library";


const useLibraryFetch = () => {

    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [libraries, setLibraries] = useState<string[]>();
    

    useEffect(() => {
        if (!isAuthenticated)
            return;

        const fetchLibraries = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch('/library', {
                    headers: { Authorization: `Bearer ${token}`}
                });

                const { libraries } = await response.json();
                setLibraries(libraries);
            } 
            catch (err) {
                console.log(err);
            }
        }

        fetchLibraries();
    }, [getAccessTokenSilently, isAuthenticated]);

    const addLibrary = useCallback((library: Library) => {
        if (!libraries)
            return;

        fetch('/library', 
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ library })
            })
        .then(res => {
            if (!res.ok)
                throw new Error("Failed to add library to database 😭");
            res.json().then(console.log);
            setLibraries([...libraries, library.name]);
        })
        .catch(err => console.error);
    }, [libraries])

    return { libraries, addLibrary };
}

export default useLibraryFetch;