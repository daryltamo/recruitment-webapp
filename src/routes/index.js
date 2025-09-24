const express = require('express');
const router = express.Router();

// Import route files
const candidatureRoutes = require('./candidature');
const connexionRoutes = require('./connexion');
const demandeRoutes = require('./demande');
const ficheDePosteRoutes = require('./ficheDePoste');
const offreDemploiRoutes = require('./offreDemploi');
const organisationRoutes = require('./organisation');
const piecesJointesRoutes = require('./piecesJointes');
const adminRoutes = require('./admin/accueilAdmin');

// Define main routes
router.use('/candidature', candidatureRoutes);
router.use('/connexion', connexionRoutes);
router.use('/demande', demandeRoutes);
router.use('/ficheDePoste', ficheDePosteRoutes);
router.use('/offreDemploi', offreDemploiRoutes);
router.use('/organisation', organisationRoutes);
router.use('/piecesJointes', piecesJointesRoutes);
router.use('/admin', adminRoutes);

module.exports = router;