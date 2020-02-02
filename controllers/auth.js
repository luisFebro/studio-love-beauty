const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { msgG } = require('./_msgs/globalMsgs');
const { msg } = require('./_msgs/auth');

// MIDDLEWARES
exports.mwIsAuth = (req, res, next) => {
    let token = req.header('x-auth-token') || req.header("authorization"); // authrization for postman tests
    if(token.includes("Bearer ")) {
        token = token.slice(7);
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            let user = req.profile && decoded && req.profile._id.toString() === decoded.id;
            if(err || !user) return res.status(403).json(msg('error.notAuthorized'));

            next();
        })
};

exports.mwIsAdmin = (req, res, next) => {
    if(req.profile.role !== "admin") {
        return res.status(403).json(msg('error.accessDenied'));
    }
    next();
};

exports.mwSession = (req, res, next) => { // n1
    const token = req.header("x-auth-token"); // this does not work with authorization header // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjQzMDFlZDM5YTRlMTI1NDYyNzdhOCIsImlhdCI6MTU3NDIxMDUwNCwiZXhwIjoxNTc0ODE1MzA0fQ.HAUlZ6lCHxRuieN5nizug_ZMTEuAmJ2Ck22uCcBkmeY"

    if(!token) return console.log("New user accessed without JWT Token!");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.authObj = decoded; // eg { id: '5db4301ed39a4e12546277a8', iat: 1574210504, exp: 1574815304 } // iat refers to JWT_SECRET. This data is generated from jwt.sign
        next();
    } catch(err) {
        console.log("This user has an Invalid or Expired JWT Token! " + err)
        return res.status(401).json(msg('error.sessionEnded'));
    }
}
// END MIDDLEWARES

// this will load the authorized user's data after and only if the token is valid in mwAuth
exports.loadAuthUser = (req, res) => {
    const userIdInsideJwt = req.authObj.id;

    User.findById(userIdInsideJwt)
        .select('-cpf')
        .exec((err, profile) => {
            if(err) return res.status(500).json(msgG('error.systemError', err))
            res.json({ profile });
        })
}

exports.register = (req, res) => {
    let { name, email, cpf, birthday, phone, maritalStatus } = req.body;

    if(maritalStatus === "selecione estado civil") {
        maritalStatus = "cliente não informou";
    }

    const newUser = new User({
        name,
        email,
        cpf,
        birthday,
        phone,
        maritalStatus
    });

    newUser.save()
    .then(user => {
        res.json({
            msg: msg('ok.successRegister', name, 'onlyMsg'),
            authUserId: user._id,
        });
    });
}

exports.login = (req, res) => {
    const { password, needKeepLoggedIn } = req.body;
    const { _id, name, role } = req.profile;

    let expiringTime;
    role === "cliente" ? expiringTime = "90d" : expiringTime = "30m"; // default: 30m (enum: 30s, 30m, 1h, 7d)

    jwt.sign(
        { id: _id },
        process.env.JWT_SECRET,
        { expiresIn: expiringTime },
        (err, token) => {
            if(err) return res.status(500).json(msgG('error.systemError', err));
            res.json({
                token,
                role,
                name,
                authUserId: _id,
                msg: msg('ok.welcomeBack', name, 'onlyMsg')
            });
        }
    )

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

