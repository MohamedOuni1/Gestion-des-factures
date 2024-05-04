module.exports = app => {
  const router = require('express').Router();
  const articleController = require('../controllers/articles.controller');
  const clientController = require('../controllers/clients.controller');
  const factureController = require('../controllers/factures.controller'); // Ajout du contrôleur pour les factures
  const userController = require('../controllers/users.controller'); // Importez le contrôleur des produits

  // Routes pour les articles
  router.post('/article', articleController.createArticle);
  router.get('/article', articleController.getAllArticles);
  router.get('/article/:id', articleController.getArticleById);
  router.put('/article/:id', articleController.updateArticle);
  router.delete('/article/:id', articleController.deleteArticle);

  // Routes pour les clients
  router.post('/client', clientController.createClient);
  router.get('/client', clientController.getAllClients);
  router.get('/client/:id', clientController.getClientById);
  router.put('/client/:id', clientController.updateClient);
  router.delete('/client/:id', clientController.deleteClient);

  // Routes pour les factures
  router.post('/facture', factureController.createFacture);
  router.get('/facture', factureController.getAllFactures);
  router.get('/facture/:id', factureController.getFactureById);
  router.put('/facture/:id', factureController.updateFacture);
  router.delete('/facture/:id', factureController.deleteFacture);
  router.post('/login',userController.loginUser)
  router.post('/register',userController.registerUser)
  app.use('/api/', router);
}
