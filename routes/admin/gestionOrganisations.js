var express = require('express');
var router = express.Router();
var organisationModel = require("../../model/organisation");

router.get('/', function(req, res) {
    organisationModel.readall(function(results) {
        if (results) {
            res.render('../views/admin/gestionOrganisations', {
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

router.delete('/:siren_org', function(req, res) {
    const siren_org = req.params.siren_org;
    organisationModel.delete(siren_org, function(result) {
        if (result) {
            res.status(200).json({
                message: 'Organisation supprimee',
            });
        } else {
            res.status(404).json({
                error: 'Echec de la suppression',
            });
        }
    });
});



module.exports = router;

