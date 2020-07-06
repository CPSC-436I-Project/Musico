const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import {GenreEnum} from '../../../app/src/components/index';

const messageObject = {
    user: mongoose.Types.ObjectId,
    message: String
}

const chatSchema = new Schema({
    // channel: GenreEnum,
    channel: String,
    messages: [messageObject]
});

let Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;