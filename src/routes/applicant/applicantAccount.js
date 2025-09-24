const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
    res.render('../../views/applicant/applicantAccount', {
        title: 'MT Rec - My Account',
        surname : req.session.surname,
        firstname : req.session.firstname,
        role : req.session.role,
        organisation : req.session.orgId
    });
});

router.post('/update', function(req, res) {
    res.render('../../views/applicant/applicantAccount', {
        title: 'MT Rec - My Account'
    });
});



module.exports = router;
