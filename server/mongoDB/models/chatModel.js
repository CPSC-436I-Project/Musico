const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import {GenreEnum} from './GenreEnum';

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
    channel: {
        type: GenreEnum,
        required: true
    },
    messages: [messageObject]
});

let Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;