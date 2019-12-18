const Admin = require('../models/admin');
const formidable = require('formidable');
const fs = require('fs');
const BusinessInfo = require("../models/admin/BusinessInfo");
const adminId = '5db4301ed39a4e12546277a8';
const businessInfoId = "5dcc77a0db168f112884b27f"; //n1a
const { msgG } = require('./_msgs/globalMsgs');

// MIDDLEWARES
exports.mwAdminId = (req, res, next, id) => {
    Admin.findOne({ _id: id })
    .exec((err, admin) => {
        if (!admin) return res.status(400).json(msgG('error.notFound', "O admin"));

        req.admin = admin;
        next();
    });
}

exports.mwPhoto = (req, res, next) => {
    if (req.admin.trademark.data) {
        res.set("Content-Type", req.admin.trademark.contentType);
        return res.send(req.admin.trademark.data);
    }
    next();
};
// END MIDDLEWARES

exports.createOrUpdate = (req, res) => {
    Admin.findOneAndUpdate(
        { _id: adminId },
        { $set: req.body }, // n3
        { new: true, upsert: true }, // n2
        (err, bizInfo) => {
            if (err) return res.status(400).json(msgG("error.systemError", err));
            res.json(bizInfo);
        }
    );
};

exports.read = (req, res) => {
    Admin.findById(adminId)
    .populate('businessInfo', "bizInstagram bizName bizWebsite")
    .select("-trademark -verificationPass")
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

// exports.createConfig = (req, res) => {
//     let form = new formidable.IncomingForm();

//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files) => { // fields from doc
//         if (err) return res.status(400).json(msgG('error.systemErr', err));

//         Admin.findById(adminId)
//         .exec((err, admin) => {
//             if(err) return res.status(500).json(msgG('error.systemError', err))

//             if (files.trademark) {
//                 const ONE_MEGABYTE = 1000000; // 1kb = 1000
//                 if (files.trademark > ONE_MEGABYTE) return res.status(400).json({ msg: "Tamanho de imagem excedido"})
//                 admin.trademark.data = fs.readFileSync(files.trademark.path); // provide media info
//                 admin.trademark.contentType = files.trademark.type;
//             } else {
//                 return res.status(400).json(msg('error.noPhoto'))
//             }

//             admin.save((err, result) => {
//                 if (err) return res.status(500).json(msgG('error.systemError', err));
//                 res.json(result);
//             });
//         })
//     });
// }

exports.updateConfig = (req, res) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).json(msgG('error.systemErr', err));

        Admin.findById(adminId)
        .exec((err, admin) => {
            if(err) return res.status(500).json(msgG('error.systemError', err))

            admin = Object.assign(admin, fields);

            if (files.trademark) {
                const ONE_MEGABYTE = 1000000; // 1kb = 1000
                if (files.trademark > ONE_MEGABYTE) return res.status(400).json({ msg: "Tamanho de imagem excedido"})
                admin.trademark.data = fs.readFileSync(files.trademark.path); // provide media info
                admin.trademark.contentType = files.trademark.type;
            } else {
                return res.status(400).json(msg('error.noPhoto'))
            }

            admin.save((err, result) => {
                if (err) return res.status(500).json(msgG('error.systemError', err));
                res.json(result);
            });
        })
    });
}

exports.checkVerificationPass = (req, res) => {
    const { pass } = req.body;

    Admin.findById({ _id: adminId })
    .exec((err, admin) => {
        if (err) return res.status(400).json(msgG("error.systemError", err));
        const { verificationPass } = admin;
        if(verificationPass !== pass) return res.status(401).json({ msg: "A senha de verificação está errada." })
        res.json({ msg: "A verificação foi realizada com sucesso!"})
    })
};

exports.updateVerificationPass = (req, res) => {
    const query = req.body;
    Admin.findOneAndUpdate(
    { _id: adminId },
    { $set: query },
    { new: true })
    .exec(err => {
        if (err) return res.status(400).json(msgG("error.systemError", err));
        res.json({ msg: "A senha foi alterada com sucesso!"})
    })
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