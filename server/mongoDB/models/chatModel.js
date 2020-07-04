import mongoose from 'mongoose';
import Schema from 'mongoose';
import {GenreEnum} from '../../../app/src/components/index'


const chatSchema = new Schema({
    channel: GenreEnum,
    messages: [String]
});

let Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;