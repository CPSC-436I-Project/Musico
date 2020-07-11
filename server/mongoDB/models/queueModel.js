const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Song = require('./songModel').schema;

const queueSchema = new Schema({
    channel: {
        type: GenreEnum,
        required: true
    },
    queue: [{
        type: Song
    }]
});

let Queue = mongoose.model("Queue", queueSchema);
module.exports = Queue;