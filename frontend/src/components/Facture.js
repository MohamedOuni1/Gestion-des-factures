import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Article.css';

const Facture = () => {
    const [factures, setFactures] = useState([]);
    const [deleteMsg, setDeleteMsg] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [clientDetails, setClientDetails] = useState({});
    const inputRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/facture');
            setFactures(response.data);
        } catch (error) {
            console.error('Something went wrong', error);
        }
    }, []);

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/client');
                const details = {};
                response.data.forEach(client => {
                    details[client.id] = {
                        nom: client.nom,
                        prenom: client.prenom,
                    };
                });
                setClientDetails(details);
            } catch (error) {
                console.error('Error fetching client details:', error);
            }
        };

        fetchClientDetails();
    }, []);

    const deleteFacture = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/facture/${id}`);
            fetchData();
            setDeleteMsg(true);
            inputRef.current.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    const filteredFactures = factures.filter(facture =>
        // Utilisez la bonne propriété pour le filtrage
        facture.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container' ref={inputRef}>
            <nav className='flex'>
                <h1>Gestion des Factures</h1>
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder="Rechercher une facture par ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Link className='btn-primary' to='/facture/create'>Créer une facture</Link>
            </nav>
            {deleteMsg && (
                <div style={{ backgroundColor: '#34cd60', color: '#fff', padding: '10px', borderRadius: '5px'}}>
                    La facture a été supprimée avec succès.
                </div>
            )}
            <table className="articles-table">
                <thead  style={{ textAlign: 'center' }}>
                    <tr>
                        <th style={{ textAlign: 'center' }}>ID</th>
                        <th style={{ textAlign: 'center' }}>Client</th>
                        <th style={{ textAlign: 'center' }}>Montant</th>

                        <th style={{ textAlign: 'center' }}>Actions</th> {/* Ajout de la colonne Actions */}
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
    {filteredFactures.map((facture, index) => (
        <tr key={index}>
            <td>{facture.id}</td>
            <td>{clientDetails[facture.c] ? `${clientDetails[facture.c].nom}` : ''}</td>
            <td>{facture.montant}</td>
            <td>
                <Link to={`/facture/details/${facture.id}`} style={buttonStyle}>
                    Détails
                </Link>
                <button onClick={() => deleteFacture(facture.id)} style={buttonStyle}>
                    Supprimer
                </button>
                <Link to={`/facture/update/${facture.id}`} style={buttonStyle}>
                    Modifier
                </Link>
            </td>
        </tr>
    ))}
</tbody>

            </table>
        </div>
    );
};

const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    margin: '0 5px',
    cursor: 'pointer',
    textDecoration: 'none', 
};

export default Facture;
