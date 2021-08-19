import Book from "../../model/Book";
import styles from './library.module.scss';


interface Props {
    book: Book
    onChangeRead: (read: boolean) => void
    onDeleteBook: () => void
}

const BookView = ({ book, onChangeRead, onDeleteBook }: Props) => {

    const { title, author, read, numPages } = book;

    return (
        <article className={styles.book + (read ? ` ${styles.read}` : '')}>
            <h3>{title}</h3>
            <div aria-label="Author">{author}</div>
            <small>{`${numPages} pages`}</small>
            <small>
                <label className={styles.readField}>
                    Read:
                    <input type="checkbox" name="read" checked={read}
                        onChange={(e) => onChangeRead(e.currentTarget.checked)}/>
                </label>
            </small>
            <button className={styles.deleteButton} onClick={onDeleteBook} aria-label="Delete book">X</button>
        </article>
    )
}

export default BookView;