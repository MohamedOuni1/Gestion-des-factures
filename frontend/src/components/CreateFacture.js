import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFacture = () => {
    const navigate = useNavigate();
    const [newFacture, setNewFacture] = useState({});

    const [clients, setClients] = useState([]);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/client');
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching client:', error);
            }
        };

        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/article');
                setArticles(response.data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchClients();
        fetchArticles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name.startsWith("q")) {
            const articleIndex = parseInt(name.slice(1)) - 1;
            const articleId = newFacture[`a${name.slice(1)}`];
            const article = articles.find(article => article.id === articleId);
    
            if (article) {
                const updatedQuantities = {
                    ...newFacture,
                    [name]: value
                };
    
                // Calcul de la somme totale
                let total = 0;
                for (let i = 1; i <= 3; i++) {
                    const quantity = parseInt(updatedQuantities[`q${i}`]) || 0;
                    const articleId = updatedQuantities[`a${i}`];
                    const article = articles.find(article => article.id === articleId);
                    if (article) {
                        total += quantity * article.prix;
                    }
                }
    
                // Mise à jour du state avec les nouvelles valeurs
                setNewFacture(prevState => ({
                    ...prevState,
                    ...updatedQuantities,
                    montant: total
                }));
            }
        } else {
            // Mise à jour du state pour les autres champs
            setNewFacture(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/facture', newFacture);
            navigate('/facture');
        } catch (error) {
            console.error('Error creating Facture:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Créer une facture</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Client :</label><br />
                    <select name="c" value={newFacture.c || ''} onChange={handleChange} required>
                        <option value="">Sélectionnez le nom du client</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>{client.nom}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label>Article :</label><br />
                    <select name="a1" value={newFacture.a1 || ''} onChange={handleChange} required>
                        <option value="">Sélectionnez le nom de l'article</option>
                        {articles.map(article => (
                            <option key={article.id} value={article.id}>{article.nom}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label>Quantité d'article :</label><br />
                    <input
                        type="number"
                        name="q1"
                        value={newFacture.q1 || ''}
                        onChange={handleChange}
                        required
                        placeholder='Entrez le quantité '
                    />
                </div>

                <div className='form-group'>
                    <label>Article :</label><br />
                    <select name="a2" value={newFacture.a2 || ''} onChange={handleChange} required>
                        <option value="">Sélectionnez le nom de l'article</option>
                        {articles.map(article => (
                            <option key={article.id} value={article.id}>{article.nom}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label>Quantité d'article :</label><br />
                    <input
                        type="number"
                        name="q2"
                        value={newFacture.q2 || ''}
                        onChange={handleChange}
                        required
                        placeholder='Entrez le quantité '
                    />
                </div>

                <div className='form-group'>
                    <label>Article :</label><br />
                    <select name="a3" value={newFacture.a3 || ''} onChange={handleChange} required>
                        <option value="">Sélectionnez le nom de l'article</option>
                        {articles.map(article => (
                            <option key={article.id} value={article.id}>{article.nom}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label>Quantité d'article :</label><br />
                    <input
                        type="number"
                        name="q3"
                        value={newFacture.q3 || ''}
                        onChange={handleChange}
                        required
                        placeholder='Entrez le quantité '
                    />
                </div>

                <div className='form-group'>
                    <label>Prix totale de la facture :</label><br />
                    <input
                        type="number"
                        name="montant"
                        value={newFacture.montant || ''}
                        disabled // Le champ est désactivé pour éviter les modifications manuelles
                    />
                </div>

                <button className='custom-button' type='submit'>
                    Ajouter une facture
                </button>
            </form>
        </div>
    );
};

export default CreateFacture;
