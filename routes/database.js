const express = require('express');
const router = express.Router();

const {
    deleteAllFieldsInCollection
} = require('../controllers/database');

// route api/database
router.post('/delete-all-fields-collection', deleteAllFieldsInCollection);




module.exports = router;