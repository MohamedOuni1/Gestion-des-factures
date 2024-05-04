import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Article.css';

const Article = () => {
    const [articles, setArticles] = useState([]);
    const [deleteMsg, setDeleteMsg] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/article');
            setArticles(response.data);
        } catch (error) {
            console.error('Something went wrong', error);
        }
    }, []);

    const deleteArticle = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/article/${id}`);
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

    const filteredArticles = articles.filter(article =>
        article.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container' ref={inputRef}>
            <nav className='flex'>
                <h1>Gestion des Articles</h1>
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder="Rechercher par nom de l'article..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <Link className='btn-primary' to='/article/create'>Créer un Article</Link>
            </nav>
            {deleteMsg && (
                <div style={{ backgroundColor: '#34cd60', color: '#fff', padding: '10px', borderRadius: '5px'}}>
                    L'article a été supprimé avec succès.
                </div>
            )}
            <table className="articles-table">
                <thead>
                    <tr>
                    <th  style={{ textAlign: 'center' }}>ID</th>

                        <th  style={{ textAlign: 'center' }}>Nom</th>
                        <th  style={{ textAlign: 'center' }}>Référence</th>
                        <th  style={{ textAlign: 'center' }}>Prix</th>
                        <th  style={{ textAlign: 'center' }}>Image</th>

                        <th  style={{ textAlign: 'center' }}>Actions</th>

                    </tr>
                </thead>
                <tbody  style={{ textAlign: 'center' }}>
                    {filteredArticles.map((article) => (
                        <tr key={article._id}>
                                                        <td>{article.id}</td>

                            <td>{article.nom}</td>
                            <td>{article.reference}</td>
                            <td>{article.prix}</td>

                            <td>
                                {/* Utilisez une image miniature ou réduite au lieu de l'image de taille complète */}
                                <img
                                    src={article.images}
                                    alt="Article"
                                    className="article-image"
                                    style={{ maxWidth: '100px', maxHeight: '100px' }} 
                                />
                            </td>
                            <td>
                            <Link to={`/article/details/${article.id}`} style={buttonStyle}>
        Détails
    </Link>

    <button onClick={() => deleteArticle(article.id)} style={buttonStyle}>
        Supprimer
    </button>

    <Link to={`/article/update/${article.id}`} style={buttonStyle}>
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

export default Article;
