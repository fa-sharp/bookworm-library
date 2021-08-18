import { addLibrary, getLibraries } from "../db/libraryDB.js";
import { validateJWT } from "../auth/auth0.js";

/**
 * @param {Express} app
 */
export default (app) => {

    app.route('/library')

        // Authenticate
        .all(validateJWT)

        // Get all libraries
        .get((req, res) => {
            const { sub } = req.user; 
            getLibraries(sub).then(libraries => {
                if (libraries)
                    res.status(200).json({libraries});
                else {
                    res.status(404).json({message: "Couldn't find user 😭"});
                }
            }).catch(console.error);
        })

        // Add a library
        .post((req, res) => { 
            
            const { library: newLibrary } = req.body;

            addLibrary(newLibrary).then(success => {
                if (success)
                    res.status(201).json({message: `Library '${newLibrary.name}' successfully added!`});
                else
                    res.status(500).json({message: "Error adding library to database :("});
            }).catch(console.error);
        })
}