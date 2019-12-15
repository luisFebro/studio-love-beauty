const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "admin";

const data = {
    adminPreferences: {
        siteBackgroundColor: String,
    },
    trademark: {
        data: Buffer,
        contentType: String
    },
    verificationPass: {
        type: String,
        default: "slb19"
    },
    businessInfo: {
        type: Schema.ObjectId,
        ref: 'BusinessInfo',
        //required: true
    }
}

const adminSchema = new Schema(data, { timestamps: true });
module.exports = mongoose.model('Admin', adminSchema, collectionName);



