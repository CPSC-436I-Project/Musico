const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import {GenreEnum} from '../../../app/src/components/index';

const queueObject = {
    songID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    numVotes: {
        type: Number,
        required: true 
    },
    albumCover: {
        type: String,
        default: ""
    }
};

const queueSchema = new Schema({
    // channel: GenreEnum,
    channel: {
        type: String,
    },
    queue: [queueObject]
});

let Queue = mongoose.model("Queue", queueSchema);
module.exports = Queue;