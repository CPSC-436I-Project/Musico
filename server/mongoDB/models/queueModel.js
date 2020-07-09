const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import {GenreEnum} from '../../../app/src/components/index';


const queueSchema = new Schema({
    // channel: GenreEnum,
    channel: {
        type: String,
        required: true
    },
    queue: [mongoose.Types.ObjectId]
});

let Queue = mongoose.model("Queue", queueSchema);
module.exports = Queue;