const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Song = require('./songModel').schema;

const queueSchema = new Schema({
    channel: {
        type: String,
        enum: ["Electronic", "Rock", "Lo-Fi", "Reggae", "Country", "Hip-Hop", "Jazz", "Rap"],
        required: true
    },
    queue: [{
        type: Song
    }]
});

let Queue = mongoose.model("Queue", queueSchema);
module.exports = Queue;