const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Song = require('./songModel').schema;


const playlistSchema = new Schema({
    channel: {
        type: String,
        enum: ["Electronic", "Rock", "Lo-Fi", "Reggae", "Country", "Hip-Hop", "Jazz", "Rap"],
        required: true
    },
    playlist: {
        type: [mongoose.Types.ObjectId],
        required: true
    }
});

let Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;