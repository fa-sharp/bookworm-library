import { ObjectId } from "mongodb";

export default class Library {

    /**
     * Creates a new library object, _id is created automatically
     * @param {string} name Name of the library
     */
    constructor(name) {
        this._id = ObjectId();
        this.createdTime = new Date();

        this.name = name;
        this.books = []
    }
}