const express = require('express');
const router = express.Router();
const organizationModel = require('../../model/organization');

router.get('/', function (req, res) {
    organizationModel.readall(function (results) {
        if (results) {
            res.render('../views/admin/gestionOrganisations', {
                title: 'MT Rec - Liste des organisations',
                organisations: results,
                message: 'Organisations trouvees'
            });
        } else {
            res.status(404).json({
                error: 'Aucune organisation trouvee.'
            });
        }
    });
});

router.delete('/:sirenOrg', function (req, res) {
    const sirenOrg = req.params.sirenOrg;
    organizationModel.delete(sirenOrg, function (result) {
        if (result) {
            res.status(200).json({
                message: 'Organisation supprimee'
            });
        } else {
            res.status(404).json({
                error: 'Echec de la suppression'
            });
        }
    });
});

module.exports = router;
