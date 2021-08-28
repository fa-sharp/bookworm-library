import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import { useEffect, useRef } from 'react';
import Book from '../../model/Book';
import styles from './forms.module.scss'

interface BookFormProps {
    options: BookFormOptions;
    addBook: (book: Book) => void;
    updateBook: (bookIndex: number, book: Book) => void;
    closeBookForm: () => void;
}

export interface BookFormOptions {
    mode: 'UPDATE' | 'ADD';
    show: boolean;
    bookToUpdate?: Book;
    bookToUpdateIndex?: number;
}

interface BookFormValues {
    title: string;
    author: string;
    numPages: string;
    read: boolean;
}



const BookForm = ({ options: { mode, show, bookToUpdate, bookToUpdateIndex }, addBook, updateBook, closeBookForm }: BookFormProps) => {

    let initialValues: BookFormValues;
    if (mode === 'ADD' || show === false || !bookToUpdate)
        initialValues =  { title: '', author: '', numPages: '', read: false }
    else
        initialValues = { title: bookToUpdate.title, author: bookToUpdate.author, numPages: bookToUpdate.numPages.toString(), read: bookToUpdate.read }

    // Auto-focus cursor on name field
    const nameFieldRef = useRef<HTMLInputElement>();
    useEffect(() => {
        if (nameFieldRef.current && show)
            nameFieldRef.current.focus();
    }, [show]);


    return (
    <div className={styles.formContainer + (show ? ` ${styles.show}` : '')}>
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validate={values => {
                const errors: FormikErrors<BookFormValues> = {};

                const { title, author, numPages } = values;

                if (!title)
                    errors.title = 'Title required';
                else if (!author)
                    errors.author = 'Author required';
                else if (!numPages)
                    errors.numPages = 'Pages required'
                else if (!Number.isInteger(Number(numPages)))
                    errors.numPages = 'Pages must be an integer'
                return errors;
            }}
            validateOnChange={false}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                const { title, author, numPages, read } = values;

                if (mode === "ADD")
                    addBook(new Book(title, author, Number(numPages), read));
                else {
                    if (!bookToUpdate || !bookToUpdateIndex) {
                        console.error("Error updating book: Invalid bookToUpdate object!");
                        return;
                    }
                    updateBook(bookToUpdateIndex, { ...bookToUpdate, ...values, numPages: Number(numPages)});
                }

                setTimeout(() => {
                    resetForm();
                    setSubmitting(false);
                    closeBookForm();
                }, 200);
            }}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                     <h3>{mode === "ADD" ? 'Add a book 📖' : 'Edit book 📖'}</h3>

                    <Field name="title" type="text" innerRef={nameFieldRef} placeholder="Title" className={styles.field} />
                    <ErrorMessage name="title" component="div" className={styles.error} />

                    <Field  name="author" type="text" placeholder="Author" className={styles.field} />
                    <ErrorMessage name="author" component="div" className={styles.error} />

                    <Field  name="numPages" type="number" placeholder="# of Pages" className={styles.field} />
                    <ErrorMessage name="numPages" component="div" className={styles.error} />

                    <div>
                        <label>
                            Read: <Field name="read" type="checkbox" />
                        </label>
                    </div>
                    
                    <button type="submit" disabled={isSubmitting}>
                        {mode === "ADD" ? 'Add' : 'Update'}
                    </button>
                    <button type="reset" disabled={isSubmitting} onClick={closeBookForm}>
                        Cancel
                    </button>
                </Form>
            )}
        </Formik>
    </div>)
}

export default BookForm;