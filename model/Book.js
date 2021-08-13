export class Book {

    /**
     * Creates a book.
     *
     * @param {string} title
     * @param {string} author
     * @param {number} numPages
     * @param {boolean} read
     */
    constructor(title, author, numPages, read) {

        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.read = read;   
    }
}