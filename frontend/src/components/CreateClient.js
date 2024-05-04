import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './CreateArticle.css';

const CreateClient = () => {
    const navigate = useNavigate();
    const [newClient, setNewClient] = useState({});

    const handleChange = (e) => {
        setNewClient({
            ...newClient,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/client', newClient);
            navigate('/client'); 
        } catch (error) {
            console.error('Error creating client:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Créer Client</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Nom du Client</label>
                    <input
                        type="text"
                        name="nom"
                        value={newClient.nom}
                        onChange={handleChange}
                        required
                        placeholder='écrire le nom du client'
                    />
                </div>
                
               

                <div className='form-group'>
                    <label>Adresse </label>
                    <input
                        type="text"
                        name="adresse"
                        value={newClient.adresse}
                        onChange={handleChange}
                        placeholder='écrire le adresse du client'
                    />
                </div>

                <div className='form-group'>
                    <label>Telephone portable</label>
                    <input
                        type="text"
                        name="mobile"
                        value={newClient.mobile}
                        onChange={handleChange}
                        placeholder='écrire le mobile du client'
                    />
                </div>

                <div className='form-group'>
                    <label>Images URL</label>
                    <input
                        type="text"
                        name="images"
                        value={newClient.images}
                        onChange={handleChange}
                        placeholder="écrire url de l'image principale"
                    />
                </div>
                
                <button className='custom-button' type='submit'>
                    Ajouter ce client
                </button>
            </form>
        </div>
    );
};

export default CreateClient;
