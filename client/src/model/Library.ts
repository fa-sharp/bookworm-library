import Book from "./Book";

export default class Library {
    _id: undefined | string;
    createdTime: Date;
    name: string;
    books: Book[];

    /**
     * 
     */
    constructor(name: string) {
        this.createdTime = new Date();

        this.name = name;
        this.books = [];
    }
}