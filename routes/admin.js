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

// @ routes api/admin

router.get("/", read);
router.put("/", createOrUpdate);

router.get("/photo/:adminId", mwPhoto);
router.put("/business-info/update", updateBusinessInfo);

router.put("/config", updateConfig);

router.get("/verification-pass", readVerificationPass);
router.post("/verification-pass", checkVerificationPass);

// Services CRUD
router.post("/service/:adminId", mwIsAdmin, createService);
router.get("/service/list/all", readServicesList);
router.put("/service/:adminId", mwIsAdmin, updateService);
router.delete("/service/:adminId", mwIsAdmin, deleteService);
// End Services CRUD

router.get("/list/staff-with-bookings", mwUniqueStaffIds, getStaffWithBookings);

router.param('adminId', mwAdminId);

module.exports = router;