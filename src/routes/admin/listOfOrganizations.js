var express = require('express');
var router = express.Router();
var organisationModel = require("../../model/organisation");

router.get('/', function(req, res) {
    organisationModel.readall(function(results) {
        if (results) {
            res.render('../views/admin/listeOrganisations', {
                title: 'MT Rec - Liste des organisations',
                organisations: results,
                message: 'Organisations trouvees',
            });
        } else {
            res.status(404).json({
                error: 'Aucune organisation trouvee.',
            });
        }
    });
});

module.exports = router;
