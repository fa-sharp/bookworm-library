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

    return (
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
    )
}

export default LibraryView