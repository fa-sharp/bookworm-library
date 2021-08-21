import { User } from '@auth0/auth0-react';
import { useState } from 'react'
import useBookFetch from '../../data/useBookFetch';
import useLibraryFetch from '../../data/useLibraryFetch';
import { BookForm, LibraryForm } from '../Forms';
import LibraryView from '../Library/LibraryView';

interface Props {
    user: User | undefined
}


const LibraryApp = ({user}: Props) => {

    // get libraries from database
    const { libraries, addLibrary, addBook, deleteBook } = useLibraryFetch();

    // the library currently in view (default: first library)
    const [currentLibraryIndex, setCurrentLibraryIndex] = useState(0);

    // Methods to add/delete/update books
    const { toggleBookRead } = useBookFetch(libraries? libraries[currentLibraryIndex] : null);

    const [showBookForm, setShowBookForm] = useState(false);
    const [showLibraryForm, setShowLibraryForm] = useState(false);


    return (
        <main>
            {!libraries ? "Loading..." :
            <>
                <BookForm
                    show={showBookForm}
                    addBook={(book) => addBook(currentLibraryIndex, book)}
                    closeAddBookForm={() => setShowBookForm(false)} />
                <LibraryForm
                    show={showLibraryForm}
                    addLibrary={addLibrary}
                    closeLibraryForm={() => setShowLibraryForm(false)} />
                
                <label htmlFor="librarySelect">Select Library: </label>
                <select name="library" id="librarySelect"
                    onChange={(e) => setCurrentLibraryIndex(e.target.selectedIndex)}>
                
                    {libraries.map(library =>
                        <option key={library._id}>
                            {`${library.name} (${library.books.length})`}
                        </option>
                    )}
                </select>
                <button onClick={() => setShowLibraryForm(true)}>Add Library</button>
                <LibraryView
                    books={libraries[currentLibraryIndex].books}
                    toggleBookRead={toggleBookRead}
                    deleteBook={(bookIndex) => deleteBook(currentLibraryIndex, bookIndex)}
                    onClickAddBook={() => setShowBookForm(true)} />
            </>}
            {user && <div>{user.nickname || user.name} logged in!</div>}
        </main>
    )
}

export default LibraryApp