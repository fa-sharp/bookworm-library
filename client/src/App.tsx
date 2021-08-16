import './App.css';
import Library from './components/Library/Library';
import AddBookForm from './components/AddBookForm/AddBookForm';
import useBookFetch from './data/useBookFetch';

function App() {

    const { books, addBook, deleteBook, toggleBookRead } = useBookFetch('Bobby');

    return (
        <div className="App">
            <main>
                <section>
                    <h2>My Library</h2>
                    {!books ? "Loading..."
                        : <Library
                            books={books} 
                            toggleBookRead={toggleBookRead} 
                            deleteBook={deleteBook} />}

                    <AddBookForm addBook={addBook} />
                </section>
            </main>
        </div>
    );
}



export default App;
