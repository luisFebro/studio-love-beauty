const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "staff-booking";


const data = {
    status: {
        type: String,
        default: "pendente",
        enum: ["atrasado", "pendente", "cancelado", "feito"],
    },
    staffName: String,
    clientName: {
        type: String,
        trim: true,
        lowercase: true,
    },
    notes: {
        type: String,
        trim: true,
        lowercase: true,
    },
    bookingDate: String
}

const StaffBookingSchema = new Schema(data, { timestamps: true });
module.exports = mongoose.model('StaffBooking', StaffBookingSchema, collectionName);