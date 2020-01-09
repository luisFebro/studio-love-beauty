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
    // Services
    createService,
    readServicesList,
    updateService,
    deleteService,
    // End
    getStaffWithBookings,
    checkVerificationPass,
    readVerificationPass,
} = require('../controllers/admin');

const { mwUniqueStaffIds } = require("../controllers/staffBooking");
const { mwIsAdmin } = require("../controllers/auth");
const { mwUserId } = require("../controllers/user");

// @ routes api/admin

router.get("/", read);
router.put("/", createOrUpdate);

router.get("/photo/:adminId", mwPhoto);
router.put("/business-info/update", updateBusinessInfo);

router.put("/config", updateConfig);

router.get("/verification-pass", readVerificationPass);
router.post("/verification-pass", checkVerificationPass);

// Services CRUD
router.post("/service/:userId", mwIsAdmin, createService);
router.get("/service/list/all", readServicesList);
router.put("/service/:userId", mwIsAdmin, updateService);
router.delete("/service/:userId", mwIsAdmin, deleteService);
// End Services CRUD

router.get("/list/staff-with-bookings", mwUniqueStaffIds, getStaffWithBookings);

router.param('adminId', mwAdminId);
router.param('userId', mwUserId);

module.exports = router;