import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './CreateArticle.css';

const CreateArticle = () => {
    const navigate = useNavigate();
    const [newArticle, setNewArticle] = useState({});

    const handleChange = (e) => {
        setNewArticle({
            ...newArticle,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/article', newArticle);
            navigate('/article'); 
        } catch (error) {
            console.error('Error creating article:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Créer Article</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nom du Article</label>
                    <input
                        type="text"
                        name="nom"
                        value={newArticle.nom}
                        onChange={handleChange}
                        required
                        placeholder='écrire le nom darticle'
                    />
                </div>
                
                <div className='form-group'>
                    <label>Référence</label>
                    <input
                        type="text"
                        name="reference"
                        value={newArticle.reference}
                        onChange={handleChange}
                        required
                        placeholder='écrire le référence du article'
                    />
                </div>


                <div className='form-group'>
                    <label>Catégorie</label>
                    <input
                        type="text"
                        name="categorie"
                        value={newArticle.categorie}
                        onChange={handleChange}
                        placeholder='écrire le catégorie du article'
                    />
                </div>
                <div className='form-group'>
                    <label>Prix</label>
                    <input
                        type="text"
                        name="prix"
                        value={newArticle.prix}
                        onChange={handleChange}
                        placeholder='écrire le catégorie du article'
                    />
                </div>
                <div className='form-group'>
                    <label>Images URL</label>
                    <input
                        type="text"
                        name="images"
                        value={newArticle.images}
                        onChange={handleChange}
                        placeholder="écrire url de l'image principale"
                    />
                </div>
                <input
                    type="text"
                    name="images1"
                    value={newArticle.images1}
                    onChange={handleChange}
                    placeholder="écrire url de l'image secondaire" 
                />
                <input
                    type="text"
                    name="images2"
                    value={newArticle.images2}
                    onChange={handleChange}
                    placeholder="écrire url de l'image secondaire" 
                />
              
                
                <button className='custom-button' type='submit'>
                    Ajouter cet article
                </button>
            </form>
        </div>
    );
};

export default CreateArticle;
