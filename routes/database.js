const express = require('express');
const router = express.Router();

const {
    mwUserId,
} = require("../controllers/user");

const {
    readAllDbFromModels,
} = require('../controllers/database');

const { mwIsAdmin, mwIsAuth } = require("../controllers/auth");


// route api/database
// router.post('/delete-all-fields-collection', deleteAllFieldsInCollection);
router.get('/db-from-models/list/:userId', mwIsAuth, mwIsAdmin, readAllDbFromModels);
router.param("userId", mwUserId);



module.exports = router;