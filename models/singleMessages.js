const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const message = new Schema({
    id: {
        type: Object,
    },
    from: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    eventId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const SingleMessage = mongoose.model("messaging_datas", message);
module.exports = SingleMessage;