import React, { useState, useEffect } from 'react';
import { getAnimes } from '../services/animeService';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import '../styles/animeList.scss';

const AnimeList = () => {
    const [animes, setAnimes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimes = async () => {
            try {
                const data = await getAnimes();
                setAnimes(data);
                setIsLoading(false);
            } catch (error) {
                setError('Impossible de récupérer la liste des anime');
                setIsLoading(false);
            }
        };

        fetchAnimes();
    }, []);

    return (
        <Layout title="Ma liste d'anime">
            <div className="anime-list">
                {error ? <p>{error}</p> : ''}
                {!isLoading && animes.length === 0 ? (
                    <p>Aucun anime trouvé.</p>
                ) : (
                    animes.map(anime => (
                        <Link to={`/anime/${anime.id}`} key={anime.id} className="anime-card">
                            <div className="anime-info">
                                <h2>{anime.title}</h2>
                                <p>{anime.description}</p>
                            </div>
                            {anime.image && (
                                <div className="anime-image">
                                    <img src={`${anime.image}`} alt={anime.title} />
                                </div>
                            )}
                        </Link>
                    ))
                )}
            </div>
        </Layout>
    );
};

export default AnimeList;
