import Book from "../../../model/Book";
import BookComponent from "./BookComponent";
import styles from './style.module.scss';

interface LibraryProps {
    books: Book[]
    toggleBookRead: (bookToUpdate: Book, bookIndex: number) => void;
}

const Library = ({ books, toggleBookRead }: LibraryProps) => {

    return (
        <section className={styles.library}>
            {books.map((book, index) =>
                <BookComponent 
                    book={book}
                    key={`${book.author}${index}`}
                    onChangeRead={(read) => toggleBookRead(book, index)} />
            )}
        </section>
    )
}

export default Library