const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();

// Sessions and authentication
const sessions = require('express-session');
const sessionFonctions = require('./sessions');

// Generic / basic routes
const healthRouter = require('./src/routes/health');
const indexRouter = require('./src/routes/index');
const loginRouter = require('./src/routes/login');
const usersRouter = require('./src/routes/users');
const organizationRouter = require('./src/routes/organization');
const jobOfferRouter = require('./src/routes/jobOffer');
const jobDescriptionRouter = require('./src/routes/jobDescription');
const applicationRouter = require('./src/routes/application');
const requestRouter = require('./src/routes/request');
const injectionRouter = require('./test/routeInjectionTest');

// Admin's routes
const adminAccountRouter = require('./src/routes/admin/adminAccount');
const adminHomepageRouter = require('./src/routes/admin/adminHomepage');
const adminListOrganizationsRouter = require('./src/routes/admin/adminListOrganizations');
const adminListRequestsToBecomeAdminRouter = require('./src/routes/admin/adminListRequestsToBecomeAdmin');
const adminListRequestsToBecomeRecruiterRouter = require('./src/routes/admin/adminListRequestsToBecomeRecruiter');
const adminListRequestsToCreateOrgRouter = require('./src/routes/admin/adminListRequestsToAddOrg');
const adminListRequestsToJoinOrgRouter = require('./src/routes/admin/adminListRequestsToJoinOrg');
const adminManageOrganizationsRouter = require('./src/routes/admin/adminManageOrganizations');
const adminManageRecruitersRouter = require('./src/routes/admin/adminManageRecruiters');
const adminManageUsersRouter = require('./src/routes/admin/adminManageUsers');

// Applicant's routes declarations
const applicantAccountRouter = require('./src/routes/applicant/applicantAccount');
const applicantApplyToJobOfferRouter = require('./src/routes/applicant/applicantApplyToJobOffer');
const applicantBecomingAdminRouter = require('./src/routes/applicant/applicantBecomingAdmin');
const applicantBecomingRecruiterRouter = require('./src/routes/applicant/applicantBecomingRecruiter');
const applicantExpandApplicationToJobOfferRouter = require('./src/routes/applicant/applicantExpandApplicationToJobOffer');
const applicantExpandJobOfferRouter = require('./src/routes/applicant/applicantExpandJobOffer');
const applicantHomepageRouter = require('./src/routes/applicant/applicantHomepage');
const applicantListJobOffersRouter = require('./src/routes/applicant/applicantListJobOffers');
const applicantManageApplicationsRouter = require('./src/routes/applicant/applicantManageApplications');
const applicantRequestToJoinOrgRouter = require('./src/routes/applicant/applicantRequestToJoinOrg');

// Recruiter's routes declaration
const recruiterAccountRouter = require('./src/routes/recruiter/recruiterAccount');
const recruiterBecomingAdminRouter = require('./src/routes/recruiter/recruiterBecomingAdmin');
const recruiterCreateJobDescriptionRouter = require('./src/routes/recruiter/recruiterCreateJobDescription');
const recruiterCreateJobOfferRouter = require('./src/routes/recruiter/recruiterCreateJobOffer');
const recruiterExpandApplicationToJobOfferRouter = require('./src/routes/recruiter/recruiterExpandApplicationToJobOffer');
const recruiterExpandAttachmentRouter = require('./src/routes/recruiter/recruiterExpandAttachment');
const recruiterExpandJobDescriptionRouter = require('./src/routes/recruiter/recruiterExpandJobDescription');
const recruiterExpandJobOfferRouter = require('./src/routes/recruiter/recruiterExpandJobOffer');
const recruiterHomepageRouter = require('./src/routes/recruiter/recruiterHomepage');
const recruiterManageApplicationsToJobOfferRouter = require('./src/routes/recruiter/recruiterManageApplicationsToJobOffer');
const recruiterManageJobDescriptionsRouter = require('./src/routes/recruiter/recruiterManageJobDescriptions');
const recruiterManageJobOffersRouter = require('./src/routes/recruiter/recruiterManageJobOffers');
const recruiterRequestToJoinOrgRouter = require('./src/routes/recruiter/recruiterRequestToJoinOrg');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Gestion de la session
const sessionExpirationTime = 1000 * 60 * 60 ; // 60 minutes
app.use(sessionFonctions.init());
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookie parser middleware
app.use(cookieParser());
app.use(express.static('./views'));

app.use(
    sessions({
        secret: '3B3sX*Gmzq7ub//MINK.PFjx',
        saveUninitialized: true,
        cookie: { maxAge: sessionExpirationTime }, // 60 minutes
        resave: false
    })
);

// check user before app.use (path, router)
app.all('*', function (req, res, next) {
    const nonSecurePaths = [
        '/login',
        '/registration',
        '/login/userLogin',
        '/users/adduser',
        '/inject'
    ];

    const adminPaths = [
        '/admin/account',
        '/admin/homepage',
        '/admin/manageOrganizations',
        '/admin/manageUsers',
        '/admin/manageRecruiters',
        '/admin/listOrganizations',
        '/admin/listRequestsToCreateOrg',
        '/admin/listRequestsToBecomeAdmin',
        '/admin/listRequestsToBecomeRecruiter',
        '/admin/listRequestsToJoinOrg'
    ]; // admin's urls

    const applicantPaths = [
        '/applicant/account',
        '/applicant/homepage',
        '/applicant/becomingAdmin',
        '/applicant/becomingRecruiter',
        '/applicant/applicationToJobOffer',
        '/applicant/applyToJobOffer',
        '/applicant/expandJobOffer',
        '/applicant/listJobOffers',
        '/applicant/manageApplications',
        '/applicant/requestToJoinOrg'
    ]; // applicant's urls

    const recruiterPaths = [
        '/recruiter/account',
        '/recruiter/homepage',
        '/recruiter/becomingAdmin',
        '/recruiter/createJobDescription',
        '/recruiter/createJobOffer',
        '/recruiter/expandApplicationToJobOffer',
        '/recruiter/expandAttachment',
        '/recruiter/expandJobDescription',
        '/recruiter/expandJobOffer',
        '/recruiter/manageApplicationsToJobOffer',
        '/recruiter/manageJobDescriptions',
        '/recruiter/manageJobOffers',
        '/recruiter/requestToJoinOrg'
    ]; // recruiter's urls

    console.log(req.path);
    if (nonSecurePaths.includes(req.path)) {
        return next();
    }
    // authenticate user
    if (applicantPaths.includes(req.path)) {
        if (sessionFonctions.isConnected(req.session, 'Candidat')) {
            return next();
        } else {
            res
                .status(403)
                .render('error', { message: ' Unauthorized access', error: {} });
        }
    } else if (recruiterPaths.includes(req.path)) {
        if (sessionFonctions.isConnected(req.session, 'Recruteur')) {
            console.log(req.session.nom_candidat);
            return next();
        } else {
            console.log('Role : ', req.session.role);
            console.log('Id : ', req.session.idUser);
            res
                .status(403)
                .render('error', { message: ' Unauthorized access', error: {} });
        }
    } else if (adminPaths.includes(req.path)) {
        if (sessionFonctions.isConnected(req.session, 'Administrateur')) {
            return next();
        } else {
            res
                .status(403)
                .render('error', { message: ' Unauthorized access', error: {} });
        }
    } else {
        if (sessionFonctions.isConnected(req.session)) {
            return next();
        }
        // not authenticated
        res.status(404).redirect('/login');
    }
});

// Generic routes
app.use('/', indexRouter);
app.use('/health', healthRouter);
app.use('/index', indexRouter);
app.use('/registration', usersRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
// app.use('/usersList', usersRouter);
app.use('/organization', organizationRouter);
app.use('/jobOffer', jobOfferRouter);
app.use('/jobDescription', jobDescriptionRouter);
app.use('/application', applicationRouter);
app.use('/request', requestRouter);
app.use('/injection', injectionRouter);

// Admin's routes
app.use('/admin/account', adminAccountRouter);
app.use('/admin/homepage', adminHomepageRouter);
app.use('/admin/manageOrganizations', adminManageOrganizationsRouter);
app.use('/admin/manageUsers', adminManageUsersRouter);
app.use('/admin/manageRecruiters', adminManageRecruitersRouter);
app.use('/admin/listOrganizations', adminListOrganizationsRouter);
app.use('/admin/listRequestsToCreateOrg', adminListRequestsToCreateOrgRouter);
app.use('/admin/listRequestsToBecomeAdmin', adminListRequestsToBecomeAdminRouter);
app.use('/admin/listRequestsToBecomeRecruiter', adminListRequestsToBecomeRecruiterRouter);
app.use('/admin/listRequestsToJoinOrg', adminListRequestsToJoinOrgRouter);

// Applicant's routes
app.use('/applicant/account', applicantAccountRouter);
app.use('/applicant/homepage', applicantHomepageRouter);
app.use('/applicant/becomingAdmin', applicantBecomingAdminRouter);
app.use('/applicant/becomingRecruiter', applicantBecomingRecruiterRouter);
app.use('/applicant/applyToJobOffer', applicantApplyToJobOfferRouter);
app.use('/applicant/expandApplicationToJobOffer', applicantExpandApplicationToJobOfferRouter);
app.use('/applicant/expandJobOffer', applicantExpandJobOfferRouter);
app.use('/applicant/listJobOffers', applicantListJobOffersRouter);
app.use('/applicant/manageApplications', applicantManageApplicationsRouter);
app.use('/applicant/requestToJoinOrg', applicantRequestToJoinOrgRouter);

// Recruiter's routes
app.use('/recruiter/account', recruiterAccountRouter);
app.use('/recruiter/homepage', recruiterHomepageRouter);
app.use('/recruiter/becomingAdmin', recruiterBecomingAdminRouter);
app.use('/recruiter/createJobDescription', recruiterCreateJobDescriptionRouter);
app.use('/recruiter/createJobOffer', recruiterCreateJobOfferRouter);
app.use('/recruiter/expandApplicationToJobOffer', recruiterExpandApplicationToJobOfferRouter);
app.use('/recruiter/expandAttachment', recruiterExpandAttachmentRouter);
app.use('/recruiter/expandJobDescription', recruiterExpandJobDescriptionRouter);
app.use('/recruiter/expandJobOffer', recruiterExpandJobOfferRouter);
app.use('/recruiter/manageApplicationsToJobOffer', recruiterManageApplicationsToJobOfferRouter);
app.use('/recruiter/manageJobDescriptions', recruiterManageJobDescriptionsRouter);
app.use('/recruiter/manageJobOffers', recruiterManageJobOffersRouter);
app.use('/recruiter/requestToJoinOrg', recruiterRequestToJoinOrgRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
