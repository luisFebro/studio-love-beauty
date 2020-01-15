const Finance = require("../../models/finance");
const User = require("../../models/user");
const { msgG } = require('../_msgs/globalMsgs');

// FINANCES CRUD
exports.create = (req, res) => {
    const newFinanceData = req.body;

    Finance.findOne({ agentName: req.body.agentName }) // duplicated data will be handled with prevent Default after clicking on submit.
    .exec((err, finance) => {
        // if(agentName) return res.status(400).json(msgG("error.alreadyAdded", "operação financeira"))
        const newFinanceOps = new Finance(newFinanceData);

        newFinanceOps.save((err, itemCreated) => {
            if (err) return res.status(500).json(msgG("error.systemError", err));
            res.json(msgG("ok.created", "Operação Financeira"));
        })
    })
}

exports.readList = (req, res) => {
    Finance.find({})
    .sort({ createdAt: -1 })
    .exec((err, docs) => {
        if (err) return res.status(500).json(msgG("error.systemError", err));
        res.json(docs);
    })
}

exports.update = (req, res) => {
    const itemId = req.params.itemId;

    Finance.findOneAndUpdate(
    { _id: itemId },
    { $set: req.body },
    { new: true })
    .exec((err, service) => {
        if (err) return res.status(500).json(msgG("error.systemError", err));
        res.json(msgG("ok.updated", "Operação Financeira"));
    })
}

exports.remove = (req, res) => {
    const itemId = req.params.itemId;

    Finance.findByIdAndRemove(itemId)
    .exec((err, item) => {
        if(err || !item) return res.status(404).json(msgG("error.notFound", "Item"));
        res.json(msgG("ok.removedDoc", "Item"));
    });
}
// END FINANCES CRUD

// LISTS
exports.getCashOpsList = (req, res) => {
    const period = req.params.period;
    const date = req.query.thisDayMonth;
    const month = req.query.thisMonth;

    let queryCashOut;
    let queryCashIn;
    switch(period) {
        case 'day':
            queryCashOut = { cashOutValue: { $gt: 0}, formattedDate: { $regex: `^${date}`, $options: 'i'}};
            queryCashIn = { cashInValue: { $gt: 0}, formattedDate: { $regex: `^${date}`, $options: 'i'}};
            break;
        case 'month':
            queryCashOut = { cashOutValue: { $gt: 0}, formattedDate: { $regex: `${month}`, $options: 'i'}};
            queryCashIn = { cashInValue: { $gt: 0}, formattedDate: { $regex: `${month}`, $options: 'i'}};
            break;
        case 'all':
            queryCashOut = { cashOutValue: { $gt: 0}};
            queryCashIn = { cashInValue: { $gt: 0}};
            break;
        default:
            console.log("Something did not work in the query switch in getCashOpsList")
    }
    Finance.find(queryCashOut)
    .sort({ createdAt: -1 })
    .exec((err, cashOutOps) => {
        if (err) return res.status(500).json(msgG("error.systemError", err));
        Finance.find(queryCashIn)
        .sort({ createdAt: -1 })
        .exec((err, cashInOps) => {
            if (err) return res.status(500).json(msgG("error.systemError", err));
            res.json({
                cashOutOps,
                cashInOps
            })
        })
    })
}

// desc: for form select field
exports.getAllStaffNames = (req, res) => {
    User.find({ role: "colaborador"})
    .select("name")
    .sort({ name: 1 })
    .exec((err, names) => {
        if (err) return res.status(400).json(msgG("error.systemError", err));
        const resArray = names.map(staff => staff.name)
        res.json(resArray);
    })
}
// END LISTS