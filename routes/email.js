const express = require("express");
const router = express.Router();

const {
    mwGetLinkChangePass,
    mwGetLinkConfirm,
    sendWelcomeConfirmEmail,
    sendNewPasswordEmail
} = require("../controllers/email");

const { mwValidateBuyRequest } = require('../controllers/_mw-validation/email');
const { mwValidateEmail } = require('../controllers/_mw-validation/auth');

// @ routes api/email/...
router.post('/client/welcome-and-confirm/:authId', mwGetLinkConfirm, sendWelcomeConfirmEmail);
router.post('/client/new-password', mwValidateEmail, mwGetLinkChangePass, sendNewPasswordEmail);
module.exports = router;
