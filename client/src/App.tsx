import { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import Book from '../../model/Book'
import './App.css';

function App() {

  const [books, setBooks] = useState<Book[]>();

  useEffect(() => {
    fetch("/books")
      .then((res) => res.json())
      .then((data) => setBooks(data.books));
  }, []);

  const toggleBookRead = useCallback((bookToUpdate: Book, bookIndex: number) => {
    if (!books) return;

    bookToUpdate.read = !bookToUpdate.read;
    const newBooks = [...books];
    newBooks[bookIndex] = bookToUpdate;

    setBooks(newBooks);
  
    fetch(`/books/${bookIndex}`,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ book: bookToUpdate })
    });
  }, [books]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <section>
          <h2>Books</h2>
          {!books ? "Loading..."
                : books.map((book, bookIndex) => 
                    <p key={bookIndex} onClick={() => toggleBookRead(book, bookIndex)}>
                      {book.title} by {book.author}, {book.numPages} pages, {book.read ? "Read" : "Not read"}
                    </p>
                 )}
        </section>
      </header>
    </div>
  );
}



export default App;
