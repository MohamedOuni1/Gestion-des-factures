import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetailsArticle.css';
const DetailsArticle = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/article/${id}`);
                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="details-container">
            <h2 className="details-title">
                Détails de l'Article : {" "}
                {article && <span style={{ color: "red" }}>{article.nom}</span>} {/* Mettre le nom en rouge si article n'est pas null */}
            </h2>
            <div className="details-content">
                <p><span className="details-label">ID:</span> {article && article.id}</p>
                <p><span className="details-label">Référence:</span> {article && article.reference}</p>
                <p><span className="details-label">Prix:</span> {article && article.prix}</p>
                <p><span className="details-label">Catégorie:</span> {article && article.categorie}</p>
                <div className="image-container">
                    <span className="details-label">Image:</span>
                    <div className="image-wrapper">
                        {article && (
                            <img 
                                src={article.images}
                                alt="Article"
                                className="article-image"
                                style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }} 
                            />
                        )}
                        {article && (
                            <img
                                src={article.images1}
                                alt="Article"
                                className="article-image"
                                style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }} 
                            />
                        )}
                        {article && (
                            <img
                                src={article.images2}
                                alt="Article"
                                className="article-image"
                                style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }} 
                            />
                        )}
                       
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsArticle;
