const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
    nom: { type: String, required: true },
    reference: { type: String }, 
    categorie: { type: String },
    prix: { type: String }, // Si le prix est un nombre, utilisez Number
    
    images: { type: String }, 
    images1: { type: String }, 
    images2: { type: String }, 
}, { timestamps: true }); // Ajout de timestamps pour enregistrer automatiquement les dates de création et de modification

// Méthode pour transformer l'objet en JSON en incluant l'ID
ArticleSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// Méthode statique pour obtenir un article par référence
ArticleSchema.statics.findByReference = function(reference) {
    return this.findOne({ reference });
};

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
