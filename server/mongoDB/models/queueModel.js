const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const queueSchema = new Schema({
    channel: {
        type: String,
        enum: ["Asian", "Blues", "Children", "Christian", "Classical", "Country", "Electronic", "Hip-Hop",
            "Independent", "Jazz", "Latin American", "Other", "Pop", "Reggae", "Rock", "Soul"],
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
