import Book from "../../model/Book";
import BookComponent from "./BookComponent";
import styles from './library.module.scss';

interface LibraryProps {
    books: Book[]
    deleteBook: (bookIndex: number) => void;
    toggleBookRead: (bookToUpdate: Book, bookIndex: number) => void;
    onClickAddBook: () => void
}

const Library = ({ books, deleteBook, toggleBookRead, onClickAddBook }: LibraryProps) => {

    return (
        <section className={styles.library}>
            {books.map((book, index) =>
                <BookComponent 
                    book={book}
                    key={`${book.author}${index}`}
                    onChangeRead={(read) => toggleBookRead(book, index)} 
                    onDeleteBook={() => deleteBook(index)} />
            )}
            <button onClick={onClickAddBook} className={styles.addBookButton}>
                <i className="far fa-plus-square"></i>
            </button>
        </section>
    )
}

export default Library