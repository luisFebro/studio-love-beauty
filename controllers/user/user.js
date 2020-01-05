const User = require("../../models/user");
const StaffBooking = require("../../models/user/StaffBooking");
const BackupUser = require('../../models/backup/BackupUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { msgG } = require('../_msgs/globalMsgs');
const { msg } = require('../_msgs/user');
const validateEmail = require('../../utils/validation/validateEmail');

// fetching enum values exemple:
// console.log(User.schema.path("role").enumValues); [ 'admin', 'colaborador', 'cliente' ]

// MIDDLEWARES - mw
exports.mwUserId = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) return res.status(400).json(msg('error.notFound'));
        req.profile = user;
        next();
    });
};

exports.mwBackup = (req, res, next) => {
    const { name } = req.profile;
    const data = {
        subject: name,
        backup: req.profile
    }

    let backup = new BackupUser(data);

    backup.save((err => {
        if(err) return res.status(500).json(msgG('error.systemError', err));
        console.log(msgG("ok.backupSuccess", `do usuário ${name.toUpperCase()}`, 'onlyMsg'))
    }))

    next();
}
// END MIDDLEWARE


exports.read = (req, res) => {
    req.profile.password = undefined;
    return res.json(req.profile);
};

exports.update = (req, res) => { // n2
    User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }) // real time updated! this send the most recently updated response/doc from database to app
    .exec((err, user) => {
        if(err) return res.status(500).json(msgG('error.systemError', err));
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.remove = (req, res) => { //needs to put auth as middleware
    const user = req.profile;
    user.remove((err, data) => {
        if(err) return res.status(500).json(msgG('error.systemError', err));
        res.json(msg('ok.userDeleted', data.name.toUpperCase()));
    });

}

exports.confirmUserAccount = (req, res) => {
    const { authUserId } = req.params
    User.findById(authUserId)
    .exec((err, user) => {
        if(!user) return res.status(404).json(msg('error.notFoundConfirmation'))
        if(err) return res.status(500).json(msgG('error.systemError', err));

        const { isUserConfirmed, name } = user;

        if(user && !isUserConfirmed) {
            User.findByIdAndUpdate(authUserId, { isUserConfirmed: true })
            .exec(err => {
                if(err) return res.status(500).json(msgG('error.systemError', err));
                res.json(msg('ok.userConfirmed', name));
            })
        }
        else {
            res.status(400).json(msg('error.userAlreadyConfirmed'))
        }
    })
}

exports.addElementArray = (req, res) => {
    const objToChange = req.body; // n2
    const _id = req.params.id;
    User.findByIdAndUpdate(_id, { $push: objToChange }, { new: true })
    .exec((err, user) => {
        if (err) return res.status(500).json(msgG('error.systemError', err)) // NEED CREATE
        res.json({
            user,
            msg: msgG('ok.added', 'onlyMsg')
        });
    });
}

exports.removeElementArray = (req, res) => {
    const objToChange = req.body;
    const _id = req.params.id;
    User.findByIdAndUpdate(_id, { $pull: objToChange }, { new: true })
    .exec((err, user) => {
        if (err) return res.status(500).json(msgG('error.systemError', err)) // NEED CREATE
        res.json({
            user,
            msg: msgG('ok.removed', 'onlyMsg')
        });
    });
}

exports.removeField = (req, res) => { // n1
    let targetField = req.body.fieldToBeDeleted;
    User.findById(req.params.id)
    .exec((err, selectedUser) => {
        if(selectedUser[targetField] === "[]") return res.status(400).json(msgG("error.notRemovedField", targetField))

        selectedUser.set(targetField, undefined, {strict: false} );
        selectedUser.save(() => res.json(msgG("ok.removedField", targetField)))
    })
}

// LISTS
exports.getList = (req, res) => {
    User.find({})
        .select("-password")
        .sort({ name: 1 })
        .exec((err, data) => {
            if(err) return res.status(500).json(msgG('error.systemError', err));
            res.json(data);
        });
}

exports.getHighestScores = (req, res) => {
    User.find({})
    .select("name loyaltyScores")
    .sort({ 'loyaltyScores.currentScore': -1 })
    .limit(3)
    .exec((err, data) => {
        if(err) return res.status(500).json(msgG('error.systemError', err));
        res.json(data);
    });
}

exports.readBackup = (req, res) => {
    BackupUser.find({})
    .exec((err, data) => {
        if(err) return res.status(500).json(msgG('error.systemError', err));
        res.json(data);
    });
}

exports.readStaffBookingList = (req, res) => {
    const bookingArrayIds = req.profile.staffBookingList;
    User.find({'_id': {$in: bookingArrayIds }})
    .exec((err, records) => {
        if(err) return res.status(500).json(msgG('error.systemError', err));
        res.json(records);
    });
}
// END LISTS


/* COMMENTS
n1: Only for objects with no default value. Need fix validation and it does not remove keys with default values.
n2: only update one specific key in the document, including objects like "key.prop".targetField. If you update an element of array, all the rest will be gone, updated.
In order to add/remove arrays use add/removeElementArray instead;
*/