import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateFacture.css';

const UpdateFacture = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [facture, setFacture] = useState({
        q1: '',
        q2: '',
        q3: '',
        a1: '',
        a2: '',
        a3: '',
        c: '',
        montant: 0, // Ajout du montant initial
    });
    const [clients, setClients] = useState([]);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchFacture = async () => {
            try {
                const responseFacture = await axios.get(`http://localhost:3000/api/facture/${id}`);
                setFacture(responseFacture.data);

                const responseClients = await axios.get('http://localhost:3000/api/client');
                setClients(responseClients.data);

                const responseArticles = await axios.get('http://localhost:3000/api/article'); // Ajout de la récupération des articles
                setArticles(responseArticles.data);
            } catch (error) {
                console.error('Error fetching facture:', error);
            }
        };

        fetchFacture();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name.startsWith("q")) {
            const articleIndex = parseInt(name.slice(1)) - 1;
            const articleId = facture[`a${name.slice(1)}`]; // Utilisation de facture au lieu de Facture
            const article = articles.find(article => article.id === articleId);
    
            if (article) {
                const updatedQuantities = {
                    ...facture, // Utilisation de facture au lieu de Facture
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
                setFacture(prevState => ({
                    ...prevState,
                    ...updatedQuantities,
                    montant: total
                }));
            }
        } else {
            // Mise à jour du state pour les autres champs
            setFacture(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/api/facture/${id}`, facture);
            navigate('/facture'); 
        } catch (error) {
            console.error('Error updating facture:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Modifier une facture</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Client :</label><br />
                    <select name="c" value={facture.c || ''} onChange={handleChange} required>
                        <option value="">Sélectionnez le nom du client</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>{client.nom}</option>
                        ))}
                    </select>
                </div>
                
                {[1, 2, 3].map(index => (
                    <div key={index}>
                        <div className='form-group'>
                            <label>Article :</label><br />
                            <select name={`a${index}`} value={facture[`a${index}`] || ''} onChange={handleChange} required>
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
                                name={`q${index}`}
                                value={facture[`q${index}`] || ''}
                                onChange={handleChange}
                                required
                                placeholder='Entrez le quantité'
                            />
                        </div>
                    </div>
                ))}
                
                <div className='form-group'>
                    <label>Prix total de la facture :</label><br />
                    <input
                        type="number"
                        name="montant"
                        value={facture.montant || ''}
                        disabled // Le champ est désactivé pour éviter les modifications manuelles
                    />
                </div>
                
                <button className='custom-button' type='submit'>
                    Modifier une facture
                </button>
            </form>
        </div>
    );
};

export default UpdateFacture;
