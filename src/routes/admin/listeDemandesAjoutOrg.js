const express = require('express');
const router = express.Router();
const OrganisationRequest = require('../../models/organisation'); // Adjust the model path as necessary

// GET route to list organization addition requests
router.get('/', async (req, res) => {
    try {
        const requests = await OrganisationRequest.find({ status: 'pending' }); // Assuming 'pending' status for addition requests
        res.render('admin/listeDemandesAjoutOrg', { requests });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;