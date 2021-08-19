export default class Library {

    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        this._id = null;
        this.createdTime = new Date();

        this.name = name;
        this.books = []
    }
}