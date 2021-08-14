import express from "express";

import { addBook, closeDBConnection, connectToDB, deleteBook, getBooks, updateBook } from "./mongodb.js";

const PORT = process.env.PORT || 3001;
const testUser = {name: "Bobby"};

const app = express();
app.use(express.json());

process.on('SIGINT', function() {
    console.log('Closing database connection..');
    closeDBConnection().then(() => process.exit());
});

connectToDB().catch(console.error);

app.get('/hello', (req,res) => {
    const { name } = req.query;
    res.status(200).json({ message: `Hello ${name ? name : 'friend'}!` });
    console.log(new Date().toString(),"/hello: Sucessfully sent response!");
})

/** BOOK GET/ADD/UPDATE/DELETE ROUTES */
app.route('/books/:id?')
    .post((req, res) => { // Add a book
         
        const { book: newBook } = req.body;

        addBook(testUser, newBook).then(success => {
            if (success)
                res.status(201).json({message: `'${newBook.title}' successfully added!`});
            else
                res.status(500).json({message: "Error adding to database :("});
        }).catch(console.error);
    })
    .get((req, res) => {   // Get all books

        getBooks(testUser).then(books => {
            res.status(200).json({books});
        }).catch(console.error);
    })
    .delete((req, res) => {   // Delete a book (by index)
        const {id: bookIndex} = req.params;

        deleteBook(testUser, bookIndex).then(success => {
            if (success)
                res.status(200).json({message: `Book ${bookIndex} successfully deleted!`});
            else
                res.status(500).json({message: "Error deleting book from database :("});
        }).catch(console.error);
    })
    .put((req, res) => {   // Update a book (by index)
        const { id: bookIndex } = req.params;
        const { book: updatedBook } = req.body;

        updateBook(testUser, bookIndex, updatedBook).then(success => {
            if (success)
                res.status(200).json({message: `'${updatedBook.title}' successfully updated!`});
            else
                res.status(404).json({message: "Error updating book in database :("});
        }).catch(console.error)
    })

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})


