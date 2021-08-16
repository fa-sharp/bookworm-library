import './App.css';
import Library from './components/Library/Library';
import AddBookForm from './components/AddBookForm/AddBookForm';
import useBookFetch from './data/useBookFetch';
import useLibraryFetch from './data/useLibraryFetch';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

    const { libraries } = useLibraryFetch();

    const [currentLibrary, setCurrentLibrary] = useState<string | null>(null);
    useEffect(() => { // once libraries are loaded, load the first library by default
        if (libraries)
            setCurrentLibrary(libraries[0]);
    }, [libraries]);

    const { books, addBook, deleteBook, toggleBookRead } = useBookFetch(currentLibrary);

    return (
        <div className="App">
            <main>
                <section>
                    <h2>My Library</h2>
                    <select name="library" id="librarySelect"
                        onChange={(e) => setCurrentLibrary(e.target.value)}>
                        {libraries?.map(library =>
                            <option key={library}>
                                {library}
                            </option>)}
                    </select>
                    {!books ? "Loading..."
                        : <Library
                            books={books} 
                            toggleBookRead={toggleBookRead} 
                            deleteBook={deleteBook} />}

                    <AddBookForm addBook={addBook} />
                </section>
            </main>
        </div>
    );
}



export default App;
