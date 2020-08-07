const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageObject = {
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now,
        required: false,
    },
};

const chatSchema = new Schema(
    {
        channel: {
            type: String,
            enum: ["Asian", "Blues", "Children", "Christian", "Classical", "Country", "Electronic", "Hip-Hop",
                "Independent", "Jazz", "Latin American", "Other", "Pop", "Reggae", "Rock", "Soul"],
            required: true
        },
        messages: [messageObject]
    }
);

let Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
