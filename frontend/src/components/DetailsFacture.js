import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailsFacture = () => {
    const { id } = useParams();
    const [facture, setFacture] = useState(null);
    const [client, setClient] = useState(null);
    const [article1, setArticle1] = useState(null);
    const [article2, setArticle2] = useState(null);
    const [article3, setArticle3] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupérer les détails de la facture
                const factureResponse = await axios.get(`http://localhost:3000/api/facture/${id}`);
                setFacture(factureResponse.data);

                // Récupérer les détails du client associé à la facture
                const clientResponse = await axios.get(`http://localhost:3000/api/client/${factureResponse.data.c}`);
                setClient(clientResponse.data);

                // Récupérer les détails des articles associés à la facture
                const article1Response = await axios.get(`http://localhost:3000/api/article/${factureResponse.data.a1}`);
                setArticle1(article1Response.data);

                const article2Response = await axios.get(`http://localhost:3000/api/article/${factureResponse.data.a2}`);
                setArticle2(article2Response.data);

                const article3Response = await axios.get(`http://localhost:3000/api/article/${factureResponse.data.a3}`);
                setArticle3(article3Response.data);

            } catch (error) {
                console.error('Error fetching facture details:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="details-container">
            {facture && (
                <>
                    <h2 className="details-title">
                        Détails de la Facture : {" "}
                        <span style={{ color: "red" }}>{facture.nom}</span> {/* Mettre le nom en rouge */}
                    </h2>               
                    <div className="details-content"  style={{ textAlign: 'center' }}>
                    <p className="details-label">
                    <a href="#" style={{ backgroundColor: 'blue', color: 'white', textDecoration: 'none' }}>Télécharger FACTURE PDF</a>
</p>
                        <p><span className="details-label">ID Facture:</span> {facture.id}</p>
                        <p><span className="details-label">Nom du client:</span> {client && client.nom}</p>
                
                        <div>
                            {article1 && facture.q1 > 0 && (
                                <div>
                                    <p><span className="details-label">Nom article :</span> {article1.nom}</p>
                                    <p><span className="details-label">Quantité :</span> {facture.q1}</p>
                                </div>
                            )}
                            {article2 && facture.q2 > 0 && (
                                <div>
                                    <p><span className="details-label">Nom article :</span> {article2.nom}</p>
                                    <p><span className="details-label">Quantité :</span> {facture.q2}</p>
                                </div>
                            )}
                            {article3 && facture.q3 > 0 && (
                                <div>
                                    <p><span className="details-label">Nom article :</span> {article3.nom}</p>
                                    <p><span className="details-label">Quantité :</span> {facture.q3}</p>
                                </div>
                            )}
                        </div>
               
                        <p style={{ textAlign: 'center'}}><span className="details-label">Prix total:</span> {facture.montant} Dinars</p>
                        <p>
                            <span className="details-label">Date de création:</span>{" "}
                            {facture.date && new Date(facture.date).toLocaleString('fr-FR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            })}
                        </p>
             <p className="details-label"style={{ color: 'blue' }}>Signiatutre:</p>

                        <img src="https://www.clipartmax.com/png/full/181-1817567_an-error-occurred-mohamed-signature.png" alt="Image" style={{ maxWidth: '30%', maxHeight: '230%' }} />

                    </div>
                </>
            )}
        </div>
    );
};

export default DetailsFacture;
