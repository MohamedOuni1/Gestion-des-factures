import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Client = () => {
    const [clients, setClients] = useState([]);
    const [deleteMsg, setDeleteMsg] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/client');
            setClients(response.data);
        } catch (error) {
            console.error('Something went wrong', error);
        }
    }, []);

    const deleteClient = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/client/${id}`);
            fetchData();
            setDeleteMsg(true);
            inputRef.current.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredClients = clients.filter(client =>
        client.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container' ref={inputRef}>
            <nav className='flex'>
                <h1>Gestion des Clients</h1>
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder="Rechercher un client par son nom..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <Link className='btn-primary' to='/client/create'>Créer un Client</Link>
            </nav>
            {deleteMsg && (
                <div style={{ backgroundColor: '#34cd60', color: '#fff', padding: '10px', borderRadius: '5px'}}>
                    Le client a été supprimé avec succès.
                </div>
            )}
            <table className="articles-table">
                <thead>
                    <tr>
                        <th  style={{ textAlign: 'center' }}>ID</th>
                        <th  style={{ textAlign: 'center' }}>Nom</th>
                        <th  style={{ textAlign: 'center' }}>adresse</th>
                        <th  style={{ textAlign: 'center' }}>image</th>
                        <th  style={{ textAlign: 'center' }}>Actions</th>

                    </tr>
                </thead>
                <tbody  style={{ textAlign: 'center' }}>
                    {filteredClients.map((client) => (
                        <tr key={client._id}>
                            <td>{client.id}</td>
                            <td>{client.nom}</td>
                            <td>{client.adresse}</td>
                            <td>
                            <img
                                    src={client.images}
                                    alt="Client"
                                    className="article-image"
                                    style={{ maxWidth: '100px', maxHeight: '100px' }} 
                                />
                            
                            </td>
                            <td>
                            <Link to={`/client/details/${client.id}`} style={buttonStyle}>
        Détails
    </Link>

    <button onClick={() => deleteClient(client.id)} style={buttonStyle}>
        Supprimer
    </button>

    <Link to={`/client/update/${client.id}`} style={buttonStyle}>
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

export default Client;
