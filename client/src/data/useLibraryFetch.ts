import { useEffect, useState } from "react";


const useLibraryFetch = () => {

    const [libraries, setLibraries] = useState<string[]>();

    useEffect(() => {
        fetch(`/library`)
        .then((res) => res.json())
        .then((data) => setLibraries(data.libraries))
        .catch(console.error);
    }, []);

    return { libraries };
}

export default useLibraryFetch;