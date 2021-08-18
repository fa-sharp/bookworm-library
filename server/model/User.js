export default class User {

    /**
     * Creates a new user, ready to push to the database.
     * 
     * @param {number} authId
     */
    constructor(authId) {

        this.authId = authId;
        this.createdTime = new Date();
        
        this.libraries = [
            { name: "My Library", books: [] }
        ]
    }
}