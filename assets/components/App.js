import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AnimeList from './AnimeList';
import AnimeDetails from './AnimeDetails';
import AddAnime from './AddAnime';
import '../styles/navbar.scss';

const App = () => {
    return (
        <Router>
            <div className='navbar'>
                <nav>
                    <Link to="/">Accueil</Link>
                    <Link to="/add-anime">Ajouter un anime</Link>
                </nav>
            </div>
            <div className="content">
                <Routes>
                    <Route path="/" element={<AnimeList />} />
                    <Route path="/anime/:id" element={<AnimeDetails />} />
                    <Route path="/add-anime" element={<AddAnime />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
