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

// TEMP AUTH USER ID
const dataLoyaltyScores = {
    cashCurrentScore: {
        type: String,
        default: "0"
    },
    currentScore: { // last score + cashCurrenScore
        type: String,
        default: "0"
    },
    lastScore: { // backup purpose.
        type: String,
        default: "0"
    }
}

const LoyaltyScoresSchema = new Schema(dataLoyaltyScores, { _id: false });
// END TEMP AUTH USER ID

const data = {
    role: {
        type: String,
        default: "cliente",
        enum: ["admin", "colaborador", "cliente"]
    },
    loyaltyScores: LoyaltyScoresSchema,
    name: {
        type: String,
        trim: true,
        maxlength: 40,
        required: true,
        lowercase: false,
    },
    email: {
        type: String,
        required: true,
    },
    cpf:{
        type: String,
        unique: true,
    },
    phone: {
        type: String,
    },
    birthday: {
        type: String,
    },
    maritalStatus: {
        type: String,
        default: "Não selecionado"
    },
}

const userSchema = new Schema(data, { timestamps: true });
module.exports = mongoose.model('User', userSchema, collectionName);


/* COMMENTS
n1: LESSON: JSON does not accept numbers which starts with 0
*/