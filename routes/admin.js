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
    updateConfig,
    checkVerificationPass,
    readVerificationPass,
} = require('../controllers/admin');

// @ routes api/admin

router.get("/", read);
router.put("/", createOrUpdate);

router.get("/photo/:adminId", mwPhoto);
router.put("/business-info/update", updateBusinessInfo);

router.put("/config", updateConfig);

router.get("/verification-pass", readVerificationPass);
router.post("/verification-pass", checkVerificationPass);

router.param('adminId', mwAdminId);

module.exports = router;