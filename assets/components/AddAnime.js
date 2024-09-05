import React, { useState } from 'react';
import { addAnime } from '../services/animeService';
import Layout from '../components/Layout';

const AddAnime = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        try {
            await addAnime(formData);
            setTitle('');
            setDescription('');
            setImage(null);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'anime:', error);
        }
    };

    return (
        <Layout title="Ajouter un Anime">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Titre de l'anime" 
                />
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Description de l'anime"
                />
                <input 
                    type="file" 
                    onChange={handleImageChange} 
                />
                <button type="submit">Ajouter</button>
            </form>
        </Layout>
    );
};

export default AddAnime;
