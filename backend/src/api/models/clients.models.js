const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClientSchema = new Schema({
    nom: { type: String, required: true },
    adresse: { type: String }, 
    mobile: { type: String }, 
    images: { type: String }, 

}, { timestamps: true }); // Ajout de timestamps pour enregistrer automatiquement les dates de création et de modification

// Méthode pour transformer l'objet en JSON en incluant l'ID
ClientSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// Méthode statique pour obtenir un Client par référence
ClientSchema.statics.findByReference = function(reference) {
    return this.findOne({ reference });
};

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
