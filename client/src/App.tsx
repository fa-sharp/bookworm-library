import './App.css';
import { useState, useEffect } from 'react';

import Library from './model/Library';

import LibraryView from './components/Library/LibraryView';
import { BookForm, LibraryForm } from './components/Forms';

import useBookFetch from './data/useBookFetch';
import useLibraryFetch from './data/useLibraryFetch';
import Header from './components/Nav/Header';


function App() {

    // get libraries from database
    const { libraries, addLibrary } = useLibraryFetch();

    // the library currently in view
    const [currentLibrary, setCurrentLibrary] = useState<Library | null>(null);
    useEffect(() => { // once libraries are loaded, view the first library by default
        if (libraries)
            setCurrentLibrary(libraries[0]);
    }, [libraries]);

    // get the books from the database, as well as methods to add/delete/update them
    const { books, addBook, deleteBook, toggleBookRead } = useBookFetch(null);

    const [showBookForm, setShowBookForm] = useState(false);
    const [showLibraryForm, setShowLibraryForm] = useState(false);

    return (
        <div className="App">
            <Header />
            <main>
                <BookForm
                    show={showBookForm}
                    addBook={addBook}
                    closeAddBookForm={() => setShowBookForm(false)} />
                <LibraryForm
                    show={showLibraryForm}
                    addLibrary={addLibrary}
                    closeLibraryForm={() => setShowLibraryForm(false)} />


                <h2>My Library</h2>
                <label htmlFor="librarySelect">Select Library: </label>
                <select name="library" id="librarySelect"
                    onChange={(e) => setCurrentLibrary(libraries![e.target.selectedIndex])}>
                    {libraries?.map(library =>
                        <option key={library._id}>
                            {`${library.name} (${library.books.length})`}
                        </option>
                    )}
                </select>
                <button onClick={() => setShowLibraryForm(true)}>Add Library</button>

                {!currentLibrary ? "Loading..."
                    : <LibraryView
                        books={currentLibrary.books}
                        toggleBookRead={toggleBookRead}
                        deleteBook={deleteBook}
                        onClickAddBook={() => setShowBookForm(true)} />}
                
            </main>
        </div>
    );
}

export default App;