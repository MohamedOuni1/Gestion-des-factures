const config = require('../config/config.js');
const mongoose = require('mongoose');
const db = {};

// Configuration de la base de données
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect(config.DB_URL, { useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

db.mongoose = mongoose;
db.url = config.DB_URL;
db.articles = require('../api/models/articles.models.js')(mongoose);
db.articles = require('../api/models/clients.models.js')(mongoose);
db.articles = require('../api/models/factures.models.js')(mongoose);

module.exports = db;
