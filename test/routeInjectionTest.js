const express = require('express');

const router = express.Router();

/* POST users listing. */
router.post('/', async function (req, res, _next) {
    // Mock injection function since actual file doesn't exist
    const mockInjection = {
        injection: async () => 'mock result'
    };
    const result = await mockInjection.injection(
        req.body.email,
        req.body.password
    );
    console.log('eugvbzroubzrnoubizeroui');
    res.json({
        result: result
    });
});

module.exports = router;
