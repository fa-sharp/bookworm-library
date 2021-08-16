import express from "express";
import path from "path";

import { closeDBConnection, connectToDB } from "./db/mongoDB.js";
import createBookRoutes from "./routes/bookRoutes.js";
import createLibraryRoutes from "./routes/libraryRoutes.js";


const PORT = process.env.PORT || 3001;

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

process.on('SIGINT', function() {
    console.log('Closing database connection..');
    closeDBConnection().then(() => process.exit());
});

// Test connection to MongoDB
connectToDB().catch(console.error);

// Create API routes
createBookRoutes(app);
createLibraryRoutes(app);

// Create static client route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});