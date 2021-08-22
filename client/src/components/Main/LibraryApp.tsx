import { useCallback } from 'react';
import { useState } from 'react'
import useLibraryFetch from '../../data/useLibraryFetch';
import { BookForm, LibraryForm } from '../Forms';
import LibraryView from '../Library/LibraryView';
import styles from './libraryapp.module.scss'


export interface LibraryFormOptions {
    mode?: 'ADD' | 'UPDATE';
    show: boolean;
}

const LibraryApp = () => {

    // get libraries from database, as well as methods to add/delete/update
    const { libraries, addLibrary, deleteLibrary, updateLibrary, addBook, deleteBook, updateBook } = useLibraryFetch();

    // the library currently in view (default: first library)
    const [currentLibraryIndex, setCurrentLibraryIndex] = useState(0);

    const [showBookForm, setShowBookForm] = useState(false);
    const [libraryFormOptions, setLibraryFormOptions] = useState({ showAdd: false, showUpdate: false});

    /** Called when deleting library. Sets the next library back into view (or the previous one, if the last library is deleted) */
    const onClickDeleteLibrary = useCallback(() => {
        const libIndexToDelete = currentLibraryIndex;
        if (libIndexToDelete === libraries!.length - 1)
            setCurrentLibraryIndex(libIndexToDelete - 1);
        deleteLibrary(libIndexToDelete);
    }, [currentLibraryIndex, deleteLibrary, libraries]);
    console.count("Rendering");
    return (
        <main className={styles.mainLibraryApp}>
            {!libraries ? "Loading..." :
            <>
                <BookForm
                    show={showBookForm}
                    addBook={(book) => addBook(currentLibraryIndex, book)}
                    closeAddBookForm={() => setShowBookForm(false)} />
                <LibraryForm
                    mode='ADD'
                    show={libraryFormOptions.showAdd}
                    addLibrary={addLibrary}
                    closeLibraryForm={() => setLibraryFormOptions({showAdd: false, showUpdate: false})} />
                <LibraryForm
                    mode='UPDATE'
                    show={libraryFormOptions.showUpdate}
                    updateLibrary={(updatedLibrary) => updateLibrary(currentLibraryIndex, updatedLibrary)}
                    libraryToUpdate={libraries[currentLibraryIndex]}
                    closeLibraryForm={() => setLibraryFormOptions({showAdd: false, showUpdate: false})}
                />
                
                <div className={styles.libraryControls}>
                    <label htmlFor="librarySelect">Select Library: </label>
                    <select name="library" id="librarySelect" value={currentLibraryIndex}
                        onChange={(e) => setCurrentLibraryIndex(e.target.selectedIndex)}>
                    
                        {libraries.map((library, index) =>
                            <option key={library._id} value={index}>
                                {`${library.name} (${library.books.length})`}
                            </option>
                        )}
                    </select>
                    <button onClick={() => setLibraryFormOptions({showAdd: true, showUpdate: false})} title="Add Library" aria-label="Add Library">
                        <i className="far fa-plus-square" />
                    </button>
                    <button onClick={() => setLibraryFormOptions({showAdd: false, showUpdate: true})} 
                            title="Update Library" aria-label="Update Library">
                        <i className="far fa-edit" />
                    </button>
                    <button onClick={onClickDeleteLibrary} title="Delete Library" aria-label="Delete Library">
                        <i className="far fa-trash-alt" />
                    </button>
                </div>
                <LibraryView
                    library={libraries[currentLibraryIndex]}
                    updateBook={(bookIndex, updatedBook) => updateBook(currentLibraryIndex, bookIndex, updatedBook)}
                    deleteBook={(bookIndex) => deleteBook(currentLibraryIndex, bookIndex)}
                    onClickAddBook={() => setShowBookForm(true)} />
            </>}
        </main>
    )
}

export default LibraryApp