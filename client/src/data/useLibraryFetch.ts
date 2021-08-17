import { useCallback, useEffect, useState } from "react";
import Library from "../model/Library";


const useLibraryFetch = () => {

    const [libraries, setLibraries] = useState<string[]>();

    useEffect(() => {
        fetch('/library')
        .then((res) => res.json())
        .then((data) => setLibraries(data.libraries))
        .catch(console.error);
    }, []);

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