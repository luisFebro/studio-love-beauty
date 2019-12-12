const User = require('../../models/user');
const validateEmail = require('../../utils/validation/validateEmail');
const { msg } = require('../_msgs/auth');
const { msgG } = require('../_msgs/globalMsgs');

exports.mwValidateRegister = (req, res, next) => {
    const { name, email, cpf, birthday, phone } = req.body;

    User.findOne({ cpf })
    .then(user => {
        if(!name && !email && !cpf && !birthday && !phone) return res.status(400).json(msg('error.anyFieldFilled'));
        if(user && user.cpf === cpf) return res.status(400).json(msg('error.cpfAlreadyRegistered'));
        if(!cpf) return res.status(400).json(msg('error.noCpf'));
        if(!name) return res.status(400).json(msg('error.noName'));
        if(!email) return res.status(400).json(msg('error.noEmail'));
        if(!phone) return res.status(400).json(msg('error.noPhone'));
        if(!birthday) return res.status(400).json(msg('error.noBirthday'));
        if(!validateEmail(email)) return res.status(400).json(msg('error.invalidEmail'));
        //if(reCaptchaToken) return res.status(400).json(msg('error.noReCaptchaToken'));
        next();
    })
    .catch(err => msgG('error.systemError', err));
}

exports.mwValidateLogin = (req, res, next) => {
    const { cpf } = req.body;

    User.findOne({ cpf })
    .then(user => {
        if(!cpf) return res.status(400).json(msg('error.noCpf'));
        if(!user) return res.status(400).json(msg('error.notRegistedCpf'));
        req.profile = user;
        next();
    })
    .catch(err => msgG('error.systemError', err));
}

exports.mwValidatePassword = (req, res, next) => {
    const { password } = req.body;
    if(!password) return res.status(400).json(msg('error.noPassword'));
    if(password.length < 6) return res.status(400).json(msg('error.notEnoughCharacters'))
    if(!validatePassword(password)) return res.status(400).json(msg('error.noDigitFound'))
    next();
}

exports.mwValidateEmail = (req, res, next) => {
    const { email } = req.body;
    if(!email) return res.status(400).json(msg('error.noEmail'));
    if(!validateEmail(email)) return res.status(400).json(msg('error.invalidEmail'));
    next();
}