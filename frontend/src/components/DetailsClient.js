import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailsClient = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/client/${id}`);
                setClient(response.data);
            } catch (error) {
                console.error('Error fetching client:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="details-container">
            <h2 className="details-title">
                Détails du Client : {" "}
                {client && <span style={{ color: "red" }}>{client.nom}</span>} {/* Mettre le nom en rouge si client n'est pas null */}
            </h2>
            <div className="details-content">
                <p><span className="details-label">ID:</span> {client && client.id}</p>
                <p><span className="details-label">Nom:</span> {client && client.nom}</p>
                <p><span className="details-label">Adresse:</span> {client && client.adresse}</p>
                <p><span className="details-label">Mobile:</span> {client && client.mobile}</p>
                <p><span className="details-label">Image:</span> {client && client.images}</p>

               
                <div className="image-container">
                    <span className="details-label">Image:</span>
                    <div className="image-wrapper">
                        {client && (
                            <img 
                                src={client.images}
                                alt="Client"
                                className="client-image"
                                style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }} 
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsClient;
