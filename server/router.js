const express = require('express'); // imports express and makes sure it's required
const router = express.Router(); // a typical necessity for express applications

// Creates a simple get request to the root route (req is request, res is response). This resolves the 'Cannot GET /' issue if nothing is there.
router.get('/', (req, res) => {
    res.send('server is up and running'); // There for simply displaying or logging on port5000 that it is up and running
});

module.exports = router;