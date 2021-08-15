import { useCallback, useEffect, useState } from 'react';
import Book from '../../model/Book'
import './App.css';
import Library from './components/Library';

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
      <main>
        <section>
            <h2>My Library</h2>
            {!books ? "Loading..."
                  : <Library books={books} toggleBookRead={toggleBookRead} />}
          </section>
      </main>
    </div>
  );
}



export default App;
