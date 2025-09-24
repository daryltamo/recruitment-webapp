var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const cookieParser = require("cookie-parser");
var flash = require('connect-flash');
var app = express();


// Generic / basic routes
var indexRouter = require('./routes/index');
var connexionRouter = require('./routes/connexion');
var usersRouter = require('./routes/users');
var organisationRouter = require('./routes/organisation');
var offreDemploiRouter = require('./routes/offreDemploi');
var ficheDePosteRouter = require('./routes/ficheDePoste');
var candidatureRouter = require('./routes/candidature');
var demandeRouter = require('./routes/demande');
var injectionRouter = require('./routes/test_injection_route');

var sessions = require("express-session");
var sessionFonctions = require('./sessions');


// Admin's routes
var adminmonCompteAdminRouter = require('./routes/admin/monCompteAdmin');
var adminaccueilAdminRouter = require('./routes/admin/accueilAdmin');
var admingestionOrganisationsRouter = require('./routes/admin/gestionOrganisations');
var admingestionUtilisateursRouter = require('./routes/admin/gestionUtilisateurs');
var admingestionRecruteursRouter = require('./routes/admin/gestionRecruteurs');
var adminlisteDemandesAjoutOrgRouter = require('./routes/admin/listeDemandesAjoutOrg');
var adminlisteDemandesDevenirAdminRouter = require('./routes/admin/listeDemandesDevenirAdmin');
var adminlisteDemandesDevenirRecruteurRouter = require('./routes/admin/listeDemandesDevenirRecruteur');
var adminlisteDemandesRejoindreOrgRouter = require('./routes/admin/listeDemandesRejoindreOrg');
var adminlisteOrganisationsRouter = require('./routes/admin/listeOrganisations');


// Candidate's routes declarations
var candidatmonCompteCandidatRouter = require('./routes/candidat/monCompteCandidat');
var candidataccueilCandidatRouter = require('./routes/candidat/accueilCandidat');
var candidatcandidatureAUneOffreRouter = require('./routes/candidat/candidatureAUneOffre');
var candidatdemandeRejoindreOrgRouter = require('./routes/candidat/demandeRejoindreOrg');
var candidatdetailOffreCandidatRouter = require('./routes/candidat/detailOffreCandidat');
var candidatdevenirAdminRouter = require('./routes/candidat/devenirAdmin');
var candidatdevenirRecruteurRouter = require('./routes/candidat/devenirRecruteur');
var candidatgestionDesCandidaturesCandidatRouter = require('./routes/candidat/gestionDesCandidaturesCandidat');
var candidatlisteOffresRouter = require('./routes/candidat/listeOffres');


// Recruiter's routes declaration
var recruteurmonCompteRecruteurRouter = require('./routes/recruteur/monCompteRecruteur');
var recruteuraccueilRecruteurRouter = require('./routes/recruteur/accueilRecruteur');
var recruteurcreationFicheDePosteRouter = require('./routes/recruteur/creationFicheDePoste');
var recruteurCreationOffreRouter = require('./routes/recruteur/creationOffre');
var recruteurdemandeRejoindreOrgRouter = require('./routes/recruteur/demandeRejoindreOrg');
var recruteurdetailCandidatureRecruteurRouter = require('./routes/recruteur/detailCandidatureRecruteur');
var recruteurdetailOffreRecruteurRouter = require('./routes/recruteur/detailOffreRecruteur');
var recruteurdevenirAdminRouter = require('./routes/recruteur/devenirAdmin.js')
var recruteurgestionCandAUneOffreRouter = require('./routes/recruteur/gestionCandAUneOffre');
var recruteurgestionOffresRecruteurRouter = require('./routes/recruteur/gestionOffresRecruteur');
var recruteurgestionFichesDePosteRouter = require('./routes/recruteur/gestionFichesDePoste');
var recruteurconsulterPieceJointeRouter = require('./routes/recruteur/consulterPieceJointe');
var recruteurdetailFicheDePosteRouter = require('./routes/recruteur/detailFicheDePoste');

// var recruteurconsulterPieceJointeRouter = require('./routes/recruteur/consulterPieceJointe');




// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Gestion de la session
const session_expiration_time = 1000 * 60 * 60 * 24; // 24 heures
app.use(sessionFonctions.init());
app.use(flash());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookie parser middleware
app.use(cookieParser());
app.use(express.static('./views'));

app.use(sessions({
  secret: "3B3sX*Gmzq7ub//MINK.PFjx",
  saveUninitialized: true,
  cookie: { maxAge: 3600 * 1000 }, // 60 minutes
  resave: false
 }));
 

// check user before app.use (path, router)
app.all("*", function (req, res, next) {
  const nonSecurePaths = ["/connexion", "/inscription", "/connexion/connectUser", "/users/adduser", "/injection"];
  const candidatPaths = ["/candidat/accueilCandidat", "/candidat/gestionDesCandidaturesCandidat", "/candidat/monCompteCandidat", "/candidat/candidatureAUneOffre", "/candidat/demandeRejoindreOrg", "/candidat/detailOffreCandidat", "/candidat/devenirAdmin", "/candidat/devenirRecruteur", "/candidat/listeOffres", "/candidat/filterOffers"]; //list des urls candidat
  const recruteurPaths = ["/recruteur/accueilRecruteur", "/recruteur/monCompteRecruteur", "/recruteur/creationFicheDePoste", "/recruteur/creationOffre", "/recruteur/demandeRejoindreOrg", "/recruteur/detailCandidatureRecruteur", "/recruteur/detailOffreRecruteur", "/recruteur/gestionCandAUneOffre", "/recruteur/gestionOffresRecruteur", "/recruteur/gestionFichesDePoste", "/recruteur/consulterPieceJointe", "/recruteur/detailFicheDePoste", "/recruteur/devenirAdmin", "/recruteur/devenirRecruteur"]; //list des urls recruteur
  const administrateurPaths = ["/admin/accueilAdmin", "/admin/monCompteAdmin", "/admin/gestionOrganisations", "/admin/gestionRecruteurs", "/admin/gestionUtilisateurs", "/admin/listeDemandesAjoutOrg", "/admin/listeDemandesRejoindreOrg", "/admin/listeOrganisations"]; //list des urls recruteur


  console.log(req.path)
  if (nonSecurePaths.includes(req.path)) return next();
  //authenticate user
  if (candidatPaths.includes(req.path)) {
    if (sessionFonctions.isConnected(req.session, "Candidat")) 
    {
        return next();
    }  
    else 
    {
      res
        .status(403)
        .render("error", { message: " Unauthorized access", error: {} });
    }
  } 
  else if(recruteurPaths.includes(req.path)){
    if (sessionFonctions.isConnected(req.session, "Recruteur")) 
      {
        console.log(req.session.nom_candidat)
        return next();
      }  
      else 
      {
        console.log("Role : ", req.session.role);
        console.log("Id : ", req.session.id_utilisateur);
        res
          .status(403)
          .render("error", { message: " Unauthorized access", error: {} });
      }
  }
  else if(administrateurPaths.includes(req.path)){
    if (sessionFonctions.isConnected(req.session, "Administrateur")) 
      {
        return next();
      }  
      else 
      {
        res
          .status(403)
          .render("error", { message: " Unauthorized access", error: {} });
      }
  }
  else {
    if (sessionFonctions.isConnected(req.session)) return next();
    // not authenticated
    else 
    {
      res
      .status(404)
      .redirect("/connexion");
    }
  }
});


// Generic routes
app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/inscription', usersRouter);
app.use('/connexion', connexionRouter);
app.use('/users', usersRouter);
// app.use('/usersList', usersRouter);
app.use('/organisation', organisationRouter);
app.use('/offreDemploi', offreDemploiRouter);
app.use('/ficheDePoste', ficheDePosteRouter);
app.use('/candidature', candidatureRouter);
app.use('/demande', demandeRouter);
app.use('/injection', injectionRouter);

// Admin's routes
app.use('/admin/monCompteAdmin', adminmonCompteAdminRouter);
app.use('/admin/accueilAdmin', adminaccueilAdminRouter);
app.use('/admin/gestionOrganisations', admingestionOrganisationsRouter);
app.use('/admin/gestionUtilisateurs', admingestionUtilisateursRouter);
app.use('/admin/gestionRecruteurs', admingestionRecruteursRouter);
app.use('/admin/listeDemandesAjoutOrg', adminlisteDemandesAjoutOrgRouter);
app.use('/admin/listeDemandesDevenirAdmin', adminlisteDemandesDevenirAdminRouter);
app.use('/admin/listeDemandesDevenirRecruteur', adminlisteDemandesDevenirRecruteurRouter);
app.use('/admin/listeDemandesRejoindreOrg', adminlisteDemandesRejoindreOrgRouter);
app.use('/admin/listeOrganisations', adminlisteOrganisationsRouter);

// Candidate's routes
app.use('/candidat/monCompteCandidat', candidatmonCompteCandidatRouter);
app.use('/candidat/accueilCandidat', candidataccueilCandidatRouter);
app.use('/candidat/candidatureAUneOffre', candidatcandidatureAUneOffreRouter);
app.use('/candidat/demandeRejoindreOrg', candidatdemandeRejoindreOrgRouter);
app.use('/candidat/detailOffreCandidat', candidatdetailOffreCandidatRouter);
app.use('/candidat/devenirAdmin', candidatdevenirAdminRouter);
app.use('/candidat/devenirRecruteur', candidatdevenirRecruteurRouter);
app.use('/candidat/gestionDesCandidaturesCandidat', candidatgestionDesCandidaturesCandidatRouter);
app.use('/candidat/listeOffres', candidatlisteOffresRouter);

// Recruiter's routes
app.use('/recruteur/monCompteRecruteur', recruteurmonCompteRecruteurRouter);
app.use('/recruteur/accueilRecruteur', recruteuraccueilRecruteurRouter);
app.use('/recruteur/creationFicheDePoste', recruteurcreationFicheDePosteRouter);
app.use('/recruteur/creationOffre', recruteurCreationOffreRouter);
app.use('/recruteur/demandeRejoindreOrg', recruteurdemandeRejoindreOrgRouter);
app.use('/recruteur/detailCandidatureRecruteur', recruteurdetailCandidatureRecruteurRouter);
app.use('/recruteur/detailOffreRecruteur', recruteurdetailOffreRecruteurRouter);
app.use('/recruteur/devenirAdmin', recruteurdevenirAdminRouter);
app.use('/recruteur/gestionCandAUneOffre', recruteurgestionCandAUneOffreRouter);
app.use('/recruteur/gestionOffresRecruteur', recruteurgestionOffresRecruteurRouter);
app.use('/recruteur/gestionFichesDePoste', recruteurgestionFichesDePosteRouter);
app.use('/recruteur/detailFicheDePoste', recruteurdetailFicheDePosteRouter);
app.use('/recruteur/consulterPieceJointe', recruteurconsulterPieceJointeRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
