import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateClient = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [client, setClient] = useState({
        nom: '',
        adresse: '',
        mobile:"",
        images: '',
    });

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/client/${id}`);
                setClient(response.data);
            } catch (error) {
                console.error('Error fetching client:', error);
            }
        };

        fetchClient();
    }, [id]);

    const handleChange = (e) => {
        setClient({
            ...client,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/api/client/${id}`, client);
            navigate('/client'); 
        } catch (error) {
            console.error('Error updating Client:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Modifier le Client</h1>
            <form onSubmit={handleSubmit}>
               
                
                <div className='form-group'>
                    <label>Nom</label>
                    <input
                        type="text"
                        name="nom"
                        value={client.nom}
                        onChange={handleChange}
                        required
                        placeholder='écrire le nom du client'
                    />
                </div>

                <div className='form-group'>
                    <label>Adresse</label>
                    <input
                        type="text"
                        name="adresse"
                        value={client.adresse}
                        onChange={handleChange}
                        placeholder='écrire l adresse du client'
                    />
                </div>

                <div className='form-group'>
                    <label>Telephone portable</label>
                    <input
                        type="text"
                        name="mobile"
                        value={client.mobile}
                        onChange={handleChange}
                        placeholder='écrire le telephone du client'
                    />
                </div>

                <div className='form-group'>
                    <label>Images URL</label>
                    <input
                        type="text"
                        name="images"
                        value={client.images}
                        onChange={handleChange}
                        placeholder="écrire l'url de l'image principale"
                    />
                </div>

                <button className='custom-button' type='submit'>
                    Mettre à jour le client
                </button>
            </form>
        </div>
    );
};

export default UpdateClient;
