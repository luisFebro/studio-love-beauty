const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { msgG } = require('./_msgs/globalMsgs');
const { msg } = require('./_msgs/auth');

// MIDDLEWARES
exports.mwIsAdmin = (req, res, next) => {
    if(req.profile.isAdmin === false) {
        return res.status(403).json(msg('error.accessDenied'));
    }
    next();
};

exports.mwAuth = (req, res, next) => { // n1
    const token = req.header('x-auth-token'); // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjQzMDFlZDM5YTRlMTI1NDYyNzdhOCIsImlhdCI6MTU3NDIxMDUwNCwiZXhwIjoxNTc0ODE1MzA0fQ.HAUlZ6lCHxRuieN5nizug_ZMTEuAmJ2Ck22uCcBkmeY"

    if(!token) return console.log(msg('error.jwtNotFound', 'onlyMsg'));

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add user from payload
        req.authObj = decoded; // eg { id: '5db4301ed39a4e12546277a8', iat: 1574210504, exp: 1574815304 } // iat refers to JWT_SECRET. This data is generated from jwt.sign
    } catch (err) {
        res.status(500).json(msgG('error.systemError', err))
    }
    next();
}

// END MIDDLEWARES

// this will load the authorized user's data after and only if the token is valid in mwAuth
exports.loadAuthUser = (req, res) => {
    const userId = req.authObj.id;
    User.findById(userId)
        .select('-password')
        .exec((err, profile) => {
            if(err) return res.status(500).json(msgG('error.systemError', err))
            res.json({ profile });
        })
}

exports.register = (req, res) => {
    const { name, email, password, registeredBy } = req.body;

    const newUser = new User({
        name,
        email,
        password,
        registeredBy
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) return res.status(500).json(msgG('error.systemError', err));
            newUser.password = hash;
            newUser.save()
            .then(user => {
                jwt.sign({ id: user._id },
                    process.env.JWT_SECRET, { expiresIn: '30d' }, //30 days - "expiresIn" should be a number of seconds or string that repesents a timespan eg: "1d", "20h",
                    (err, token) => {
                        if(err) return res.status(500).json(msgG('error.systemError', err));
                        const { _id } = user
                        res.json({
                            token,
                            authUserId: _id,
                            msg: msg('ok.successRegister', 'onlyMsg')
                        });
                    }
                )
            });
        })
    })
}

exports.login = (req, res) => {
    const { password, needKeepLoggedIn } = req.body;
    const { _id, name } = req.profile;
    const registeredPass = req.profile.password;
    const expireAuthDays = needKeepLoggedIn ? '30d' : '7d';

    bcrypt.compare(password, registeredPass)
    .then(isMatch => {
        if(!isMatch) return res.status(400).json(msg('error.invalidCredentials'));

        jwt.sign({ id: _id },
            process.env.JWT_SECRET, { expiresIn: expireAuthDays }, //7 days - "expiresIn" should be a number of seconds or string that repesents a timespan eg: "1d", "20h",
            (err, token) => {
                if(err) return res.status(500).json(msgG('error.systemError', err));
                res.json({
                    token,
                    authUserId: _id,
                    msg: msg('ok.welcomeBack', name, 'onlyMsg')
                });
            }
        )
    })
}

exports.changePassword = (req, res) => {
    const { password, authToken } = req.body;
    const { id } = req.query;

    User.findOne({ _id: id })
    .then(user => {
        if(!user.tempAuthUserToken) return res.status(400).json(msg('error.noAuthToken'))
        if(user.tempAuthUserToken.this !== authToken) return res.status(400).json(msg('error.expiredAuthToken'))

        user.tempAuthUserToken.this = undefined;
        bcrypt.genSalt(10, (err, salt) => { // n3
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) return res.status(500).json(msgG('error.systemError', err));
                user.password = hash;
                user.save(err => {
                    if(err) return res.status(500).json(msgG('error.systemError', err));
                    res.json(msg('ok.changedPassword', user.name));
                })
            })
        })
    })
}

/* COMMENTS
n1:
/*this middleware is created so that
we can have private routes that are only
accessed if we send along the token from routes/api/auth*/

/*The purpose of this function here is to get
the token that's sent from either react
or postman angular whatever front-end
you're using where it's gonna send along
a token

n3: Salted hashing — Generating random bytes (the salt) and combining it with the password before hashing creates unique hashes across each user’s password. If two users have the same password they will not have the same password hash.salt
e.g
salt - $2a$10$qggYRlcaPWU296DD7M3Ryu
hash - $2a$10$qggYRlcaPWU296DD7M3RyujYuDVnKKxo91rAHIKJKMXCmsnQVGn/2
*/

