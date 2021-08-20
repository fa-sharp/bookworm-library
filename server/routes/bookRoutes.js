import { addBook, deleteBook, updateBook } from "../db/bookDB.js";
import { validateJWT } from "../auth/auth0.js";

export default (app) => {
    
    app.route('/api/book')

        // Authenticate
        .all(validateJWT)

        // Add a book
        .post((req, res) => { 
            
            const { sub } = req.user;
            const { library, book } = req.body;

            addBook(sub, library, book).then(newBook => {
                if (newBook)
                    res.status(201).json({book: newBook, message: `Book '${newBook.title}' successfully added to library ${library._id}!`});
                else
                    res.status(500).json({message: "Error adding book to database :("});
            }).catch(console.error);
        })

        // Delete a book
        .delete((req, res) => {   

            const { sub } = req.user;
            const { library, book } = req.body;

            deleteBook(sub, library, book).then(success => {
                if (success)
                    res.status(200).json({message: `Book ${book._id} successfully deleted!`});
                else
                    res.status(500).json({message: "Error deleting book from database :("});
            }).catch(console.error);
        })

        // Update a book (by index)
        .put((req, res) => {   
            const { sub } = req.user;
            const { library, book } = req.body;

            updateBook(sub, library, book).then(success => {
                if (success)
                    res.status(200).json({message: `'${book.title}' successfully updated!`});
                else
                    res.status(404).json({message: "Error updating book in database :("});
            }).catch(console.error)
        });
}