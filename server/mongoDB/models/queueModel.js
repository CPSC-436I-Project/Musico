const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Song = require('./songModel').schema;

const queueSchema = new Schema({
    channel: {
        type: String,
        enum: ["Blues", "Christian", "Classical", "Country", "Electronic", "Gaming", "Hip-Hop", "Jazz", "Pop", "Rap", "Reggae", "Rock"],
        required: true
    },
    queue: [
        {
            type: mongoose.Types.ObjectId,
            required: true
        }
    ]
});

let Queue = mongoose.model("Queue", queueSchema);
module.exports = Queue;