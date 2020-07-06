import mongoose from 'mongoose';
import Schema from 'mongoose';
import {GenreEnum} from '../../../app/src/components/index';

const messageObject = {
    user: mongoose.Types.ObjectId,
    message: String
}

const chatSchema = new Schema({
    channel: GenreEnum,
    messages: [messageObject]
});

let Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;