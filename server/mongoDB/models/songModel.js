const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    songName: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: ["Asian", "Blues", "Children", "Christian", "Classical", "Country", "Electronic", "Hip-Hop",
            "Indie", "Jazz", "Latin", "Other", "Pop", "Reggae", "Rock", "Soul"],
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
