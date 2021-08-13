import express from "express";
import { Book } from "../model/Book.js";

import { addBook, closeDBConnection, connectToDB, getBooks } from "./mongodb.js";

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

app.route('/books')
    .post((req, res) => {
        
        const {title, author, numPages, read } = req.body;

        const newBook = new Book(title, author, numPages, read);

        addBook(testUser, newBook).then(success => {
            if (success)
                res.status(200).json({message: `"${title}" successfully added!`});
            else
                res.status(500).json({message: "Error adding to database :("});
        }).catch(console.error);
    })
    .get((req, res) => {
        getBooks(testUser).then(books => {
            res.status(200).json({books});
        }).catch(console.error);
    })

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})


