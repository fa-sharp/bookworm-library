import { addBook, deleteBook, getBooks, updateBook } from "../db/bookDB.js";

export default (app) => {
    
    app.route('/books/:libName/:id?')

        // Get all books
        .get((req, res) => {   

            const { libName } = req.params;

            getBooks({name: libName}).then(books => {
                if (books)
                    res.status(200).json({books});
                else
                    res.status(404).json({message: `Library not found :(`})
            }).catch(console.error);
        })

        // Add a book
        .post((req, res) => {
            
            const { libName } = req.params;
            const { book: newBook } = req.body;

            addBook({name: libName}, newBook).then(success => {
                if (success)
                    res.status(201).json({message: `'${newBook.title}' successfully added!`});
                else
                    res.status(500).json({message: "Error adding to database :("});
            }).catch(console.error);
        })

        // Delete a book (by index)
        .delete((req, res) => {   
            const {id: bookIndex, libName } = req.params;

            deleteBook({name: libName}, bookIndex).then(success => {
                if (success)
                    res.status(200).json({message: `Book ${bookIndex} successfully deleted!`});
                else
                    res.status(500).json({message: "Error deleting book from database :("});
            }).catch(console.error);
        })

        // Update a book (by index)
        .put((req, res) => {   
            const { id: bookIndex, libName } = req.params;
            const { book: updatedBook } = req.body;

            updateBook({name: libName}, bookIndex, updatedBook).then(success => {
                if (success)
                    res.status(200).json({message: `'${updatedBook.title}' successfully updated!`});
                else
                    res.status(404).json({message: "Error updating book in database :("});
            }).catch(console.error)
        });
}