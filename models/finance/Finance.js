const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "finances";

const data = {
    agentId: String,
    agentRole: {
        type: String,
        enum: ["colaborador", "admin"]
    },
    agentName: {
        type: String,
        lowercase: true,
    },
    description: {
        type: String
    },
    service: String,
    cashInValue: {
        type: Number,
        default: 0,
    },
    cashOutValue: {
        type: Number,
        default: 0,
    },
    formattedDate: String,
}

const FinanceSchema = new Schema(data, { timestamps: true });
module.exports = mongoose.model('Finance', FinanceSchema, collectionName);
