import mongoose from 'mongoose';
import Schema from 'mongoose';
import {GenreEnum} from '../../../app/src/components/index';


const queueObject = {
    songID: mongoose.Types.ObjectId,
    numVotes: Number
};

const queueSchema = new Schema({
    channel: GenreEnum,
    queue: [queueObject]
});

let Queue = mongoose.model("Queue", queueSchema);
module.exports = Queue;