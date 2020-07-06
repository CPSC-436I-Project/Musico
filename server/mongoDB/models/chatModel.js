const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import {GenreEnum} from '../../../app/src/components/index';

const messageObject = {
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}

const chatSchema = new Schema({
    // channel: GenreEnum,
    channel: {
        type: String,
        required: true
    },
    messages: [messageObject]
});

let Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;