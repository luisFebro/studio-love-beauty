const StaffBooking = require("../models/user/StaffBooking");
const User = require("../models/user");
const { msgG } = require('./_msgs/globalMsgs');

// MIDLEWARES
exports.mwCreate = (req, res, next) => {
    const staffBooking = new StaffBooking(req.body);
    staffBooking.save((err, result) => {
        if (err) return res.status(500).json(msgG('error.systemError', err));
        req.bookingId = result._id
        next();
    })
}

exports.mwRemove = (req, res, next) => {
    const id = req.body.staffBookingList;
    StaffBooking.findById({_id: id})
    .exec((err, booking) => {
        if(err) return res.status(500).json(msgG('error.systemError', err));
        booking.remove(err => {
            if(err) return res.status(500).json(msgG('error.systemError', err));
            next();
        })
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

exports.update = (req, res) => {
    StaffBooking.findOneAndUpdate({ _id: req.params.bookingId }, { $set: req.body }, { new: true }) // real time updated! this send the most recently updated response/doc from database to app
    .exec((err, booking) => {
        if(err) return res.status(500).json(msgG('error.systemError', err));
        res.json(booking);
    });
};

// NOT FUCKING WORKING!!! try use splice and save then
exports.removeBookingIdFromStaff = (req, res) => {
    const _id = req.profile._id;
    const removed = req.body;
    User.findByIdAndUpdate(_id, { $pull: removed }, { new: true })
    .exec((err, user) => {
        if (err) return res.status(500).json(msgG('error.systemError', err))
        res.json({
            user,
            msg: `O Agendamento do cliente do colaborador ${user.name.toUpperCase()} foi removido com sucesso!`
        });
    });
}

exports.getList = (req, res) => {
    StaffBooking.find({})
    .exec((err, list) => {
        if (err) return res.status(500).json(msgG('error.systemError', err))
        res.json(list);
    });
}