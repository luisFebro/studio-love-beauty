const Admin = require('../models/admin');
const BusinessInfo = require("../models/admin/BusinessInfo");
const adminId = '5db4301ed39a4e12546277a8';
const businessInfoId = "5dcc77a0db168f112884b27f"; //n1a
const { msgG } = require('./_msgs/globalMsgs');

exports.createOrUpdate = (req, res) => {
    Admin.findOneAndUpdate(
        { _id: adminId },
        { $set: req.body }, // n3
        { new: true, upsert: true }, // n2
        (err, bizInfo) => {
            if (err) return res.status(400).json(msgG("error.systemError", err));
            res.json(bizInfo);
        }
    ).populate;
};

exports.read = (req, res) => {
    Admin.findById(adminId)
    .populate('businessInfo', '-bizWorkingHours')
    .then(bizInfo => res.json(bizInfo))
    .catch(err => res.json(msgG("error.systemError", err)))
}


// can also create if there is no document in the DB.
// This needed to be created before admin so that it passes the reference _id to admin.
exports.updateBusinessInfo = (req, res) => {
    BusinessInfo.findOneAndUpdate(
        { _id: businessInfoId },
        { $set: req.body }, // n3
        { new: true, upsert: true }, // n2
        (err, bizInfo) => {
            if (err) return res.status(400).json(msgG("error.systemError", err));
            res.json(bizInfo);
        }
    );
};

/* COMMENTS
n1: You can add or remove any field from businessInfo according to the client needs.
*/
// n1a this is a random id which will be created at first, then just be updated
// n2 upsert - insert a new doc, if not declared returns null || new - immediately updated! this send the most recently updated response/doc from database to app
// n3 req.body - can update primary keys, if in an object, you need update all other keys, otherwise this happens:
/*
"bizDev": {
        "name": "Febro"
        "slogon": "Projetos Web",
        "email": "febro.projetosweb@gmail.com"
},
UPDATE:
"bizDev": {
        "name": "Febro"
},

// SOLUTION:
To update individual values use dot notation:
Before Update:
"bizDev": {
    "name": "Febro",
    "slogon": "Projetos Web",
    "email": "febro.projetosweb@gmail.com",
}
Updating body.req
{
  "bizDev.name": "Febro 1000000000000000000000000000000"
}
After Update:
"bizDev": {
    "name": "Febro 1000000000000000000000000000000",
    "slogon": "Projetos Web",
    "email": "febro.projetosweb@gmail.com",
}
slogon and email is erased...
 */