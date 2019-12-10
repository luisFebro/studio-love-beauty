const { msgG } = require('./_msgs/globalMsgs');
// const Product = require('../models/product');

exports.deleteAllFieldsInCollection = (req, res) => {
    Product.updateMany({}, { $unset: req.body})
    .exec((err, data) => {
        if(err) return res.status(500).json(msgG('error.systemError', err))
        res.json(msgG('ok.success'))
    })
}