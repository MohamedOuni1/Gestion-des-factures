const slugify = require('slugify');
const db = require('../../database/db.config');
const Client = require('../models/clients.models');


const ClientController = {
    // Créer un nouveau client
    createClient: async (req, res) => {
        try {
            const client = new Client(req.body);
            await client.save();
            res.status(201).json(client);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Obtenir tous les clients
    getAllClients: async (req, res) => {
        try {
            const clients = await Client.find();
            res.json(clients);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtenir un client unique par son ID
    getClientById: async (req, res) => {
        try {
            const client = await Client.findById(req.params.id);
            if (client) {
                res.json(client);
            } else {
                res.status(404).json({ message: 'Client non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Mettre à jour un client
    updateClient: async (req, res) => {
        try {
            const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (client) {
                res.json(client);
            } else {
                res.status(404).json({ message: 'Client non trouvé' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Supprimer un client
    deleteClient: async (req, res) => {
        try {
            const client = await Client.findByIdAndDelete(req.params.id);
            if (client) {
                res.json({ message: 'Client supprimé' });
            } else {
                res.status(404).json({ message: 'Client non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = ClientController;