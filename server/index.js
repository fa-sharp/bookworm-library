import express from "express";

import { closeDBConnection, connectToDB } from "./db/mongoDB.js";
import { addBook, deleteBook, getBooks, updateBook } from "./db/bookdb.js";
import { addLibrary, getLibraries } from "./db/libraryDB.js";


const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

process.on('SIGINT', function() {
    console.log('Closing database connection..');
    closeDBConnection().then(() => process.exit());
});

// Test connection to MongoDB
connectToDB().catch(console.error);

app.get('/hello', (req,res) => {
    const { name } = req.query;
    res.status(200).json({ message: `Hello ${name ? name : 'friend'}!` });
    console.log(new Date().toString(),"/hello: Sucessfully sent response!");
})

/** BOOK GET/ADD/UPDATE/DELETE ROUTES */
app.route('/books/:libName/:id?')
    .get((req, res) => {   // Get all books

        const { libName } = req.params;

        getBooks({name: libName}).then(books => {
            if (books)
                res.status(200).json({books});
            else
                res.status(404).json({message: `Library not found :(`})
        }).catch(console.error);
    })
    .post((req, res) => { // Add a book
         
        const { libName } = req.params;
        const { book: newBook } = req.body;

        addBook({name: libName}, newBook).then(success => {
            if (success)
                res.status(201).json({message: `'${newBook.title}' successfully added!`});
            else
                res.status(500).json({message: "Error adding to database :("});
        }).catch(console.error);
    })
    .delete((req, res) => {   // Delete a book (by index)
        const {id: bookIndex, libName } = req.params;

        deleteBook({name: libName}, bookIndex).then(success => {
            if (success)
                res.status(200).json({message: `Book ${bookIndex} successfully deleted!`});
            else
                res.status(500).json({message: "Error deleting book from database :("});
        }).catch(console.error);
    })
    .put((req, res) => {   // Update a book (by index)
        const { id: bookIndex, libName } = req.params;
        const { book: updatedBook } = req.body;

        updateBook({name: libName}, bookIndex, updatedBook).then(success => {
            if (success)
                res.status(200).json({message: `'${updatedBook.title}' successfully updated!`});
            else
                res.status(404).json({message: "Error updating book in database :("});
        }).catch(console.error)
    });

/** LIBRARY GET/ADD/UPDATE/DELETE ROUTES */
app.route('/library')
    .get((req, res) => {   // Get all libraries

        getLibraries().then(libraries => {
            res.status(200).json({libraries});
        }).catch(console.error);
    })
    .post((req, res) => { // Add a library
         
        const { library: newLibrary } = req.body;

        addLibrary(newLibrary).then(success => {
            if (success)
                res.status(201).json({message: `Library '${newLibrary.name}' successfully added!`});
            else
                res.status(500).json({message: "Error adding library to database :("});
        }).catch(console.error);
    })
    

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})


