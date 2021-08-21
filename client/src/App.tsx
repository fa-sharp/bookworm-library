import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Nav/Header';
import LibraryApp from './components/Main/LibraryApp';
import DemoLibrary from './components/Main/DemoLibrary';


function App() {

    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <div className="App">
            <Header />

            <h2>Bookworm Library</h2>

            {!isLoading && 
                !isAuthenticated ? 
                <DemoLibrary />
                : <LibraryApp />}
        </div>
    );
}

export default App;