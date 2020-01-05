const express = require('express');
const router = express.Router();
const {
    mwCreate,
    update,
    mwRemove,
    getList,
    addBookingIdToStaff,
    removeBookingIdFromStaff,
} = require("../controllers/staffBooking");
const {
    mwUserId
} = require("../controllers/user");
const {
    mwIsAdmin
} = require("../controllers/auth");

// @route  api/staff-booking
router.post("/:userId", mwCreate, addBookingIdToStaff);
router.put("/:bookingId", update);
// router.put("/:userId", mwRemove, removeBookingIdFromStaff); // need mwIsAdmin

// LISTS
router.get("/list/all", getList);

router.param("userId", mwUserId);

module.exports = router;