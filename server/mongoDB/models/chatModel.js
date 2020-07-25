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
    }
}

const chatSchema = new Schema({
    channel: {
        type: String,
        enum: ["Electronic", "Rock", "Lo-Fi", "Reggae", "Country", "Hip-Hop", "Jazz", "Rap"],
        required: true
    },
    messages: [messageObject]
});

let Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;