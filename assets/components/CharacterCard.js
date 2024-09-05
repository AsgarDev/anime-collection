import React from 'react';
import '../styles/characterCard.scss';

const CharacterCard = ({ character }) => {
    return (
        <div className="character-card" key={`character-card-${character.id}`}>
            <div className="character-info">
                <h2>{character.name}</h2>
                <p>{character.role}</p>
            </div>
        </div>
    );
};

export default CharacterCard;
