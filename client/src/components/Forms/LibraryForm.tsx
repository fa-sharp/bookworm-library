import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import { useMemo } from 'react';
import Library from '../../model/Library';
import styles from './forms.module.scss'

interface CommonProps {
    show: boolean;
    closeLibraryForm: () => void;
}

type TruncateProps =
    | {
        mode: 'UPDATE';
        libraryToUpdate: Library;
        updateLibrary: (updatedLibrary: Library) => void;
        addLibrary?: never;
    }
    | {
        mode: 'ADD';
        addLibrary: (library: Library) => void;
        libraryToUpdate?: never;
        updateLibrary?: never;
    }

type LibraryFormProps = CommonProps & TruncateProps;

interface LibraryFormValues {
    name: string;
}

const LibraryForm = ({ mode = 'ADD', show, libraryToUpdate, addLibrary, updateLibrary, closeLibraryForm }: LibraryFormProps) => {

    const initialValues: LibraryFormValues = useMemo(() => mode === 'ADD' ? { name: '' } : { name: libraryToUpdate!.name }, [libraryToUpdate, mode]);

    return (
        <div className={styles.formContainer + (show ? ` ${styles.show}` : '')}>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validate={values => {
                    const errors: FormikErrors<LibraryFormValues> = {};

                    const { name } = values;

                    if (!name)
                        errors.name = 'Name required!';
                    return errors;
                }}
                validateOnChange={false}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (mode === "ADD" && addLibrary)
                        addLibrary(new Library(values.name));
                    else {
                        if (!libraryToUpdate || !updateLibrary) {
                            console.error("No library object provided to update!");
                            return;
                        }
                        updateLibrary({ ...libraryToUpdate, name: values.name });
                    }
                    setTimeout(() => {
                        resetForm();
                        setSubmitting(false);
                        closeLibraryForm();
                    }, 200);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className={styles.form}>
                        <h3>{mode === "ADD" ? 'Add a library 📚' : 'Update library 📚'}</h3>

                        <Field name="name" type="text" placeholder="Library Name" className={styles.field} />
                        <ErrorMessage name="name" component="div" className={styles.error} />

                        <button type="submit" disabled={isSubmitting}>
                            {mode === "ADD" ? 'Add' : 'Update'}
                        </button>
                        <button type="reset" disabled={isSubmitting} onClick={closeLibraryForm}>
                            Cancel
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};

export default LibraryForm;