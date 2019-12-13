const express = require('express');
const router = express.Router();
const {
    createOrUpdate,
    updateBusinessInfo,
    read,
    getCoupon,
    updateCoupon,
    mwPhoto,
    mwAdminId,
    createPhoto,
} = require('../controllers/admin');

// @ routes api/admin

router.get("/", read);
router.put("/", createOrUpdate);

router.get("/photo/:adminId", mwPhoto);
router.put("/media", createPhoto);
router.put("/business-info/update", updateBusinessInfo);

router.param('adminId', mwAdminId);

module.exports = router;