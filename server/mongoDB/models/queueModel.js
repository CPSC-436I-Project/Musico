const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import {GenreEnum} from '../../../app/src/components/index';


const queueObject = {
    songID: mongoose.Types.ObjectId,
    numVotes: Number
};

const queueSchema = new Schema({
    // channel: GenreEnum,
    channel: String,
    queue: [queueObject]
});

let Queue = mongoose.model("Queue", queueSchema);
module.exports = Queue;