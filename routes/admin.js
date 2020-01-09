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
    getStaffWithBookings,
    checkVerificationPass,
    readVerificationPass,
} = require('../controllers/admin');

const { mwUniqueStaffIds } = require("../controllers/staffBooking");

// @ routes api/admin

router.get("/", read);
router.put("/", createOrUpdate);

router.get("/photo/:adminId", mwPhoto);
router.put("/business-info/update", updateBusinessInfo);

router.put("/config", updateConfig);

router.get("/verification-pass", readVerificationPass);
router.post("/verification-pass", checkVerificationPass);

router.get("/list/staff-with-bookings", mwUniqueStaffIds, getStaffWithBookings);

router.param('adminId', mwAdminId);

module.exports = router;