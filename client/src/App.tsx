import './App.css';
import Library from './components/Library/Library';
import AddBookForm from './components/AddBookForm/AddBookForm';
import useBookFetch from './data/useBookFetch';
import useLibraryFetch from './data/useLibraryFetch';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

    const { libraries } = useLibraryFetch(); // get libraries from database

    const [currentLibrary, setCurrentLibrary] = useState<string | null>(null); // the library currently in view
    useEffect(() => { // once libraries are loaded, view the first library by default
        if (libraries)
            setCurrentLibrary(libraries[0]);
    }, [libraries]);

    // get the books from the database, as well as methods to add/delete/update them
    const { books, addBook, deleteBook, toggleBookRead } = useBookFetch(currentLibrary);

    const [showAddForm, setShowAddForm] = useState(false);

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
                            deleteBook={deleteBook}
                            onClickAddBook={() => setShowAddForm(true)} />}

                    <AddBookForm
                        show={showAddForm}
                        addBook={addBook}
                        closeAddBookForm={() => setShowAddForm(false)} />
                </section>
            </main>
        </div>
    );
}



export default App;
