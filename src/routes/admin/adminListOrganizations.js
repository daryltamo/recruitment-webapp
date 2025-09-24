const express = require('express');
const router = express.Router();
const organizationModel = require('../../model/organization');

router.get('/', function (req, res) {
    organizationModel.readall(function (results) {
        if (results) {
            res.render('../views/admin/listeOrganisations', {
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

module.exports = router;
