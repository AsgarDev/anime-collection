import React, { useState } from 'react';
import { addAnime } from '../services/animeService';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import '../styles/addAnime.scss';

const AddAnime = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });

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
            setNotification({ message: 'Anime ajouté avec succès !', type: 'success' });
            resetForm();
        } catch (error) {
            setNotification({ message: "Erreur lors de l'ajout de l'anime.", type: 'error' });
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setImage(null);
    };

    return (
        <Layout title="Ajouter un Anime">
            <Banner
                notification={notification}
                onClose={() => setNotification({ message: '', type: '' })}
            />
            <form onSubmit={handleSubmit} className="add-anime-form">
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Titre de l'anime"
                    className="form-input"
                />
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Description de l'anime"
                    className="form-textarea"
                />
                <input 
                    type="file" 
                    onChange={handleImageChange} 
                    className="form-input"
                />
                <button type="submit" className="submit-button">Ajouter</button>
            </form>
        </Layout>
    );
};

export default AddAnime;
