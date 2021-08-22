import Book from "../../model/Book";
import Library from "../../model/Library";
import BookView from "./BookView";
import styles from './library.module.scss';

interface LibraryProps {
    library: Library
    deleteBook: (bookIndex: number) => void;
    updateBook: (bookIndex: number, updatedBook: Book) => void;
    onClickAddBook: () => void
}

const LibraryView = ({ library, deleteBook, updateBook, onClickAddBook }: LibraryProps) => {

    const { books } = library;
    const numBooksRead = books.reduce((numRead, book) => book.read ? numRead + 1 : numRead, 0);

    return (
        <>
            <section className={styles.library}>
                {books.map((book, index) =>
                    <BookView
                        book={book}
                        key={book._id}
                        onChangeRead={(read) => updateBook(index, {...book, read: read})}
                        onDeleteBook={() => deleteBook(index)} />
                )}
                {books.length === 0 && "No books yet! Add one now ===>"}
                <button onClick={onClickAddBook} className={styles.addBookButton} aria-label="Add a book" title="Add a book">
                    <i className="far fa-plus-square"></i>
                </button>
            </section>
            <label>
                <progress max={books.length}
                    value={numBooksRead} />
                <div>{`You've read ${numBooksRead} / ${books.length} books `}</div>
            </label>
        </>
    )
}

export default LibraryView