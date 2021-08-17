import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import Library from '../../model/Library';
import styles from './forms.module.scss'

interface LibraryFormProps {
    show: boolean;
    addLibrary: (library: Library) => void;
    closeLibraryForm: () => void;
}

interface LibraryFormValues {
    name: string;
}

const initialValues: LibraryFormValues = { name: '' };

const LibraryForm = ({ show, addLibrary, closeLibraryForm }: LibraryFormProps) => (
    <div className={styles.formContainer + (show ? ` ${styles.show}` : '')}>
        <Formik
            initialValues={initialValues}
            validate={values => {
                const errors: FormikErrors<LibraryFormValues> = {};

                const { name } = values;

                if (!name)
                    errors.name = 'Name required!';
                return errors;
            }}
            validateOnChange={false}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    addLibrary(new Library(values.name));
                    resetForm();
                    setSubmitting(false);
                    closeLibraryForm();
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <h3>Add a library 📚</h3>

                    <Field name="name" type="text" placeholder="Library Name" className={styles.field} autoFocus />
                    <ErrorMessage name="name" component="div" className={styles.error} />
                    
                    <button type="submit" disabled={isSubmitting}>
                        Add
                    </button>
                    <button type="reset" disabled={isSubmitting} onClick={closeLibraryForm}>
                        Cancel
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);

export default LibraryForm;