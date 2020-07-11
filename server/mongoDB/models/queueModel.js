const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import {GenreEnum} from './GenreEnum';


const queueSchema = new Schema({
    channel: {
        type: GenreEnum,
        required: true
    },
    queue: [mongoose.Types.ObjectId]
});

let Queue = mongoose.model("Queue", queueSchema);
module.exports = Queue;