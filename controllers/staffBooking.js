const StaffBooking = require("../models/user/StaffBooking");
const User = require("../models/user");
const { msgG } = require('./_msgs/globalMsgs');

// MIDLEWARES
exports.mwCreateBooking = (req, res, next) => {
    const staffBooking = new StaffBooking(req.body);
    staffBooking.save((err, result) => {
        if (err) return res.status(500).json(msgG('error.systemError', err));
        req.bookingId = result._id
        next();
    })
}
// END MIDLEWARES

exports.addBookingIdToStaff = (req, res) => {
    const _idStaff = req.profile._id;
    const newBookingId = {"staffBookingList": req.bookingId}
    User.findByIdAndUpdate(_idStaff, { $push: newBookingId }, { new: true })
    .exec((err, user) => {
        if (err) return res.status(500).json(msgG('error.systemError', err))
        res.json(user);
    });
}

exports.getList = (req, res) => {
    StaffBooking.find({})
    .exec((err, list) => {
        if (err) return res.status(500).json(msgG('error.systemError', err))
        res.json(list);
    });
}