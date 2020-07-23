const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const queueSchema = new Schema({
    channel: {
        type: String,
        enum: ["Electronic", "Rock", "Lo-Fi", "Reggae", "Country", "Hip-Hop", "Jazz", "Rap"],
        required: true
    },
    queue: {
        type: [mongoose.Types.ObjectId],
        required: true
    }
});

let Queue = mongoose.model("Queue", queueSchema);
module.exports = Queue;