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
    genre: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true,
        index: {unique: true}
    },
    duration: {
        type: Number,
        required: true,
        default: 100
    },
    requesterID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    albumCover: {
        type: String,
        default: ""
    },
    numVotes: {
        type: Number,
        default: 1
    }
});

let Song = mongoose.model("Song", songSchema);
module.exports = Song;