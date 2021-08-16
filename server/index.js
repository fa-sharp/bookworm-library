import express from "express";

import { closeDBConnection, connectToDB } from "./db/mongoDB.js";
import createBookRoutes from "./routes/bookRoutes.js";
import createLibraryRoutes from "./routes/libraryRoutes.js";


const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

process.on('SIGINT', function() {
    console.log('Closing database connection..');
    closeDBConnection().then(() => process.exit());
});

// Test connection to MongoDB
connectToDB().catch(console.error);

// Create routes
createBookRoutes(app);
createLibraryRoutes(app);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});