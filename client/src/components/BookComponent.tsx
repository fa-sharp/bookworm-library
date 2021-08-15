import Book from "../../../model/Book";
import styles from './style.module.scss';


interface Props {
    book: Book
    onChangeRead: (read: boolean) => void
}

const BookComponent = ({ book, onChangeRead }: Props) => {

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
        </article>
    )
}

export default BookComponent;