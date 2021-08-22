import { addLibrary, deleteLibrary, updateLibraryName } from "../db/libraryDB.js";
import { validateJWT } from "../auth/auth0.js";

/**
 * @param {Express} app
 */
export default (app) => {

    app.route('/api/library')

        // Authenticate
        .all(validateJWT)

        // Add a library
        .post((req, res) => { 
            
            const { sub } = req.user;
            const { library } = req.body;

            addLibrary(sub, library).then(newLibrary => {
                if (newLibrary)
                    res.status(201).json({library: newLibrary, message: `Library '${newLibrary.name}' successfully added!`});
                else
                    res.status(500).json({message: "Error adding library to database :("});
            }).catch(console.error);
        })

        // Delete a library
        .delete((req, res) => {

            const { sub } = req.user;
            const { library } = req.body;

            deleteLibrary(sub, library).then(success => {
                if (success)
                    res.status(200).json({message: `Library '${library.name}' with id ${library._id} successfully deleted!`});
                else
                    res.status(500).json({message: "Error deleting library from database :("});
            }).catch(console.error);
        })

        // Update a library name
        .put((req, res) => {
            const { sub } = req.user;
            const { library } = req.body;

            updateLibraryName(sub, library).then(success => {
                if (success)
                    res.status(200).json({message: `Library with id '${library._id}' successfully updated to new name '${library.name}'!`});
                else
                    res.status(500).json({message: "Error updating library in database :("});
            }).catch(console.error);
        })
}