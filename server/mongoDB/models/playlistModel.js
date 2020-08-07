const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    channel: {
        type: String,
        enum: ["Asian", "Blues", "Children", "Christian", "Classical", "Country", "Electronic", "Hip-Hop",
            "Independent", "Jazz", "Latin American", "Other", "Pop", "Reggae", "Rock", "Soul"],
        required: true
    },
    playlist: {
        type: [mongoose.Types.ObjectId],
        required: true
    }
});

let Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;
