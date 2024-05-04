const slugify = require('slugify');
const db = require('../../database/db.config');
const Article = require('../models/articles.models');

const ArticleController = {
    // Créer un nouvel article
    createArticle: async (req, res) => {
        try {
            const article = new Article(req.body);
            await article.save();
            res.status(201).json(article);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Obtenir tous les articles
    getAllArticles: async (req, res) => {
        try {
            const articles = await Article.find();
            res.json(articles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtenir un article unique par son ID
    getArticleById: async (req, res) => {
        try {
            const article = await Article.findById(req.params.id);
            if (article) {
                res.json(article);
            } else {
                res.status(404).json({ message: 'Article non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Mettre à jour un article
    updateArticle: async (req, res) => {
        try {
            const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (article) {
                res.json(article);
            } else {
                res.status(404).json({ message: 'Article non trouvé' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Supprimer un article
    deleteArticle: async (req, res) => {
        try {
            const article = await Article.findByIdAndDelete(req.params.id);
            if (article) {
                res.json({ message: 'Article supprimé' });
            } else {
                res.status(404).json({ message: 'Article non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = ArticleController;
