import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAnime, getCharacters, getAnimeAdditionalInfo } from '../services/animeService';
import Layout from './Layout';
import CharacterCard from './CharacterCard';
import '../styles/animeDetails.scss';   

const AnimeDetails = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [additionalInfo, setAdditionalInfo] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                setLoading(true);
                const data = await getAnime(id);
                setAnime(data);

                const additionalData = await getAnimeAdditionalInfo(data.title);
                setAdditionalInfo(additionalData);
                setLoading(false);
            } catch (error) {
                setError('Impossible de récupérer les détails de l\'anime');
                setLoading(false);
            }
        };

        const fetchCharacters = async () => {
            try {
                const data = await getCharacters(id);
                setCharacters(data);
            } catch (error) {
                setError('Impossible de récupérer les personnages de l\'anime');
            }
        };

        fetchAnime();
        fetchCharacters();
    }, [id]);


    if (loading) {
        return <Layout title="Chargement...">Chargement...</Layout>;
    }

    return (
        <Layout 
            title={anime?.title} 
            sidebarClass={anime ? 'anime-background' : ''} 
            backgroundImage={anime?.image ? `/${anime.image}` : ''}
        >
            <div className='anime-details'>
                {error && <p>{error}</p>}
                {anime && (
                    <div className='anime-details-content'>
                        <div className='anime-description'>
                            <p>{anime.description}</p>
                        </div>
                        <div className='anime-additional-info'>
                            <span className='badge badge-type'>{additionalInfo.type || 'Inconnu'}</span>
                            <span className='badge badge-episodes'>{additionalInfo.episodes || 'N/A'} épisodes</span>
                        </div>
                        {anime.characters.length === 0 ? (
                            <p>Aucun personnage trouvé.</p>
                        ) : (
                            <div className='anime-characters'>
                                <h3>Personnages</h3>
                                <div className='characters-list'>
                                    {characters.map(character => (
                                        <CharacterCard key={character.id} character={character} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default AnimeDetails;
