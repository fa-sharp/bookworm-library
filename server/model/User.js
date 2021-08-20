import Library from "./Library.js";

export default class User {

    /**
     * Creates a new user, ready to push to the database.
     * 
     * @param {number} authId
     */
    constructor(authId) {

        this._id = undefined;
        this.authId = authId;
        this.createdTime = new Date();
        
        this.libraries = [
            new Library("My Library")
        ]
    }
}