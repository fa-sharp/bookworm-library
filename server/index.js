import express from "express";
import path from "path";

import { closeDBConnection, connectToDB } from "./db/mongoDB.js";
import { userRoutes, libraryRoutes, bookRoutes } from "./routes/index.js"


const PORT = process.env.PORT || 3001;

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Test connection to MongoDB
connectToDB().catch(console.error);

// Close MongoDB connection on exit
process.on('SIGINT', function() {
    console.log('Closing database connection..');
    closeDBConnection().then(() => process.exit());
});

// Create API routes
userRoutes(app);
bookRoutes(app);
libraryRoutes(app);

// Create static client route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});