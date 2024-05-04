const slugify = require('slugify');
const db = require('../../database/db.config');
const Facture = require('../models/factures.models');

const FactureController = {
    // Créer une nouvelle facture
    createFacture: async (req, res) => {
        try {
            const facture = new Facture(req.body);
            await facture.save();
            res.status(201).json(facture);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Obtenir toutes les factures
    getAllFactures: async (req, res) => {
        try {
            const factures = await Facture.find();
            res.json(factures);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtenir une facture unique par son ID
    getFactureById: async (req, res) => {
        try {
            const facture = await Facture.findById(req.params.id);
            if (facture) {
                res.json(facture);
            } else {
                res.status(404).json({ message: 'Facture non trouvée' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Mettre à jour une facture
    updateFacture: async (req, res) => {
        try {
            const facture = await Facture.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (facture) {
                res.json(facture);
            } else {
                res.status(404).json({ message: 'Facture non trouvée' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Supprimer une facture
    deleteFacture: async (req, res) => {
        try {
            const facture = await Facture.findByIdAndDelete(req.params.id);
            if (facture) {
                res.json({ message: 'Facture supprimée' });
            } else {
                res.status(404).json({ message: 'Facture non trouvée' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = FactureController;
