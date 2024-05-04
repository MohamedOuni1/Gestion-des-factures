import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateArticle = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [article, setArticle] = useState({
        nom: '',
        reference: '',
        categorie: '',
        prix:"",
        images: '',
        images1: '',
        images2: '',

    });

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/article/${id}`);
                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [id]);

    const handleChange = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/api/article/${id}`, article);
            navigate('/article'); 
        } catch (error) {
            console.error('Error updating Article:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Modifier l'Article</h1>
            <form onSubmit={handleSubmit}>
               
               
               
            <div className='form-group'>
                    <label>Nom du Article</label>
                    <input
                        type="text"
                        name="nom"
                        value={article.nom}
                        onChange={handleChange}
                        required
                        placeholder='écrire le nom darticle'
                    />
                </div>
                
                <div className='form-group'>
                    <label>Référence</label>
                    <input
                        type="text"
                        name="reference"
                        value={article.reference}
                        onChange={handleChange}
                        required
                        placeholder='écrire le référence du article'
                    />
                </div>


                <div className='form-group'>
                    <label>Catégorie</label>
                    <input
                        type="text"
                        name="categorie"
                        value={article.categorie}
                        onChange={handleChange}
                        placeholder='écrire le catégorie du article'
                    />
                </div>
                <div className='form-group'>
                    <label>Prix</label>
                    <input
                        type="text"
                        name="prix"
                        value={article.prix}
                        onChange={handleChange}
                        placeholder='écrire le catégorie du article'
                    />
                </div>
                <div className='form-group'>
                    <label>Images URL</label>
                    <input
                        type="text"
                        name="images"
                        value={article.images}
                        onChange={handleChange}
                        placeholder="écrire url de l'image principale"
                    />
                </div>
                <input
                    type="text"
                    name="images1"
                    value={article.images1}
                    onChange={handleChange}
                    placeholder="écrire url de l'image secondaire" 
                />
                <input
                    type="text"
                    name="images2"
                    value={article.images2}
                    onChange={handleChange}
                    placeholder="écrire url de l'image secondaire" 
                />
              


                <button className='custom-button' type='submit'>
                    Mettre à jour le article
                </button>
            </form>
        </div>
    );
};

export default UpdateArticle;
