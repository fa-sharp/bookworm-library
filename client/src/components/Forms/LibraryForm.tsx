import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import { useEffect } from 'react';
import { useRef } from 'react';
import Library from '../../model/Library';
import styles from './forms.module.scss'

interface LibraryFormProps {
    options: LibraryFormOptions;
    addLibrary: (newLibrary: Library) => void;
    updateLibrary: (updatedLibrary: Library) => void;
    closeLibraryForm: () => void;
}

export interface LibraryFormOptions {
    mode: 'UPDATE' | 'ADD';
    show: boolean;
    libraryToUpdate?: Library;
}

interface LibraryFormValues {
    name: string;
}

const LibraryForm = ({ options: { mode = 'ADD', show, libraryToUpdate }, addLibrary, updateLibrary, closeLibraryForm }: LibraryFormProps) => {

    let initialValues: LibraryFormValues;
    if (mode === 'ADD' || show === false || !libraryToUpdate)
        initialValues =  { name: '' }
    else
        initialValues = { name: libraryToUpdate.name };

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
                    const errors: FormikErrors<LibraryFormValues> = {};

                    const { name } = values;

                    if (!name)
                        errors.name = 'Name required!';
                    return errors;
                }}
                validateOnChange={false}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (mode === "ADD")
                        addLibrary(new Library(values.name));
                    else {
                        if (!libraryToUpdate) {
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

                        <Field name="name" type="text" innerRef={nameFieldRef} placeholder="Library Name" className={styles.field} />
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