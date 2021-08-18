import { validateJWT } from "../auth/auth0.js";
import { getUser, addUser } from "../db/userDB.js";

export default (app) => {

    app.route('/api/user')

        // Authenticate
        .all(validateJWT)

        // Get user, or add to database if not found
        .get((req, res) => {
            const { sub: authId } = req.user;
            
            getUser(authId).then(foundUser => {
                if (foundUser)
                    res.status(200).json({user: foundUser});
                else {
                    addUser(authId)
                        .then(newUser => res.status(201).json({message: "New user added!", user: newUser}))
                        .catch(err => res.status(500).json({message: "Error adding user."}))
                }
            }).catch(console.error);
        })

}