const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "all-users";

// TEMP AUTH USER ID
const dataTempAuthUserToken = {
    this: {
        type: String,
        default: '',
    },
    createdAt: { type: Date, default: Date.now, expires: '1m' }
}

const UserTokenSchema = new Schema(dataTempAuthUserToken);
// END TEMP AUTH USER ID


const data = {
    isAdmin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        trim: true,
        maxlength: 40,
        required: true,
        lowercase: false,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: ""
    },
    favoriteList: {
        type: Array,
        default: []
    },
    inCartList: {
        type: Array,
        default: []
    },
    messageList: {
        type: Array,
        default: []
    },
    couponList: {
        type: Array,
        default: []
    },
    registeredBy: {
        type: String,
        default: 'email',
    },
    isUserConfirmed: {
        type: Boolean,
        default: false,
    },
    tempAuthUserToken: UserTokenSchema
}

const userSchema = new Schema(data, { timestamps: true });
module.exports = mongoose.model('User', userSchema, collectionName);


