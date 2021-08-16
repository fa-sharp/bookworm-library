import { addLibrary, getLibraries } from "../db/libraryDB.js";

export default (app) => {

    app.route('/library')

        // Get all libraries
        .get((req, res) => {   

            getLibraries().then(libraries => {
                res.status(200).json({libraries});
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