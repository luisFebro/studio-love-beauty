const express = require('express');
const router = express.Router();
const {
    mwCreateBooking,
    getList,
    addBookingIdToStaff
} = require("../controllers/staffBooking");
const {
    mwUserId
} = require("../controllers/user");

// @route  api/staff-booking
router.post("/:userId", mwCreateBooking, addBookingIdToStaff);

// LISTS
router.get("/list/all", getList);

router.param("userId", mwUserId);

module.exports = router;