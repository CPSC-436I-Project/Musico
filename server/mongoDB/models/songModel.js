const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const songSchema = new Schema({
    songName: {
        type: String,
        required: true
    },
    artists: {
        type: [String],
        required: true
    },
    src: {
        type: String,
        required: true
    },
    requesterID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    albumCover: {
        type: String,
        default: "",
        required: true
    },
    numVotes: {
        type: Number,
        required: true
    }
});

let Song = mongoose.model("Song", songSchema);
module.exports = Song;