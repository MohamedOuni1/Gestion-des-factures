const mongoose = require('mongoose');

const { Schema } = mongoose;

const FactureSchema = new Schema({
    date: { type: Date, default: Date.now },
    q1: { type: Number, required: true, default: 0 }, // Défaut à 0
    q2: { type: Number, required: true, default: 0 }, // Défaut à 0
    q3: { type: Number, required: true, default: 0 }, // Défaut à 0
    c: { type: Schema.Types.ObjectId, ref: 'Client' }, // Référence à l'article associé à la facture
    montant: { type: Number, required: true, default: 0 }, // Défaut à 0

    a1: { type: Schema.Types.ObjectId, ref: 'Article' }, // Référence à l'article associé à la facture
    a2: [{ type: Schema.Types.ObjectId, ref: 'Article' }], // Référence facultative à des articles associés à la facture
    a3: [{ type: Schema.Types.ObjectId, ref: 'Article' }] // Référence facultative à des articles associés à la facture
}, { timestamps: true }); // Ajout de timestamps pour enregistrer automatiquement les dates de création et de modification

// Méthode pour transformer l'objet en JSON en incluant l'ID
FactureSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Facture = mongoose.model('Facture', FactureSchema);

module.exports = Facture;
