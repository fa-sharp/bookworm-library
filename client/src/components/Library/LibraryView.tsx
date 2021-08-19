import Book from "../../model/Book";
import BookView from "./BookView";
import styles from './library.module.scss';

interface LibraryProps {
    books: Book[]
    deleteBook: (bookIndex: number) => void;
    toggleBookRead: (bookToUpdate: Book, bookIndex: number) => void;
    onClickAddBook: () => void
}

const LibraryView = ({ books, deleteBook, toggleBookRead, onClickAddBook }: LibraryProps) => {

    return (
        <section className={styles.library}>
            {books.map((book, index) =>
                <BookView 
                    book={book}
                    key={`${book.author}${book.title}`}
                    onChangeRead={(read) => toggleBookRead(book, index)} 
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