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
    updateVerificationPass,
} = require('../controllers/admin');

// @ routes api/admin

router.get("/", read);
router.put("/", createOrUpdate);

router.get("/photo/:adminId", mwPhoto);
router.put("/business-info/update", updateBusinessInfo);
router.put("/config", updateConfig);

router.post("/verification-pass", checkVerificationPass);
router.put("/verification-pass", updateVerificationPass);

router.param('adminId', mwAdminId);

module.exports = router;