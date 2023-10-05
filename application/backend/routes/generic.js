const { Router } = require('express');
const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /Generic route');
    next();
});

// Uri: http://localhost:3001/GenericController/GetStatusCheck
// Type: GET
// Description: Methods that checks that backend is up.
router.get('/GetStatusCheck', (request, response) => {
    response.status(200).send(
        {
            message: 'Backend working on PORT 3001'
        }
    );
});

module.exports = router;