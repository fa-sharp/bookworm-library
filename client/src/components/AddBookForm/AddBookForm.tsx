import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import Book from '../../model/Book';
import styles from './addBookForm.module.scss'

interface AddBookFormProps {
    show: boolean;
    addBook: (book: any) => void;
    closeAddBookForm: () => void;
}

interface BookFormValues {
    title: string;
    author: string;
    numPages: string;
    read: boolean;
}

const initialValues: BookFormValues = {title: '', author: '', numPages: '', read: false};

const AddBookForm = ({ show, addBook, closeAddBookForm }: AddBookFormProps) => (
    <div className={styles.formContainer + (show ? ` ${styles.show}` : '')}>
        <Formik
            initialValues={initialValues}
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
                setTimeout(() => {
                    addBook(new Book(values.title, values.author, Number(values.numPages), values.read));
                    resetForm();
                    setSubmitting(false);
                    closeAddBookForm();
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <Field name="title" type="text" placeholder="Title" className={styles.field} />
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
                        Add
                    </button>
                    <button type="reset" disabled={isSubmitting} onClick={closeAddBookForm}>
                        Cancel
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);

export default AddBookForm;