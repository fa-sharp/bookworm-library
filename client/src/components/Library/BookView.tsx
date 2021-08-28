import Book from "../../model/Book";
import styles from './library.module.scss';


interface Props {
    book: Book
    onChangeRead: (read: boolean) => void
    onDeleteBook: () => void
    onEditBook: () => void
}

const BookView = ({ book, onChangeRead, onDeleteBook, onEditBook }: Props) => {

    const { title, author, read, numPages } = book;

    return (
        <article className={styles.book + (read ? ` ${styles.read}` : '')}>
            <div className={styles.bookMain}>
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
            </div>
            <div className={styles.bookControls}>
                <button onClick={onEditBook} title="Edit book" aria-label="Edit book">
                    <i className="far fa-edit" />
                </button>
                <button id={styles.deleteButton} onClick={onDeleteBook} aria-label="Delete book">
                    <i className="far fa-trash-alt" />
                </button>
            </div>
        </article>
    )
}

export default BookView;