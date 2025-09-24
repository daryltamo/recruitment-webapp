var express = require('express');
var injection = require("../model/test_injection.js");

var router = express.Router();

/* POST users listing. */
router.post('/', async function(req, res, next) {

    const result = await injection.injection(req.body.email,req.body.mdp);
    console.log("eugvbzroubzrnoubizeroui")
    res.json( {
        result: result
    });
});

module.exports = router;