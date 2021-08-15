import Book from "../../model/Book";
import styles from './library.module.scss';


interface Props {
    book: Book
    onChangeRead: (read: boolean) => void
    onDeleteBook: () => void
}

const BookComponent = ({ book, onChangeRead, onDeleteBook }: Props) => {

    const { title, author, read, numPages } = book;

    return (
        <article className={styles.book + (read ? ` ${styles.read}` : '')}>
            <b>{title}</b>
            {author}
            <small>{numPages} pages</small>
            <small>
                <label className={styles.readField}>
                    Read:
                    <input type="checkbox" name="read" checked={read}
                        onChange={(e) => onChangeRead(e.currentTarget.checked)}/>
                </label>
            </small>
            <button className={styles.deleteButton} onClick={onDeleteBook}>X</button>
        </article>
    )
}

export default BookComponent;