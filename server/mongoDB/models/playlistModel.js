const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Song = require('./songModel').schema;

const playlistSchema = new Schema({
    channel: {
        type: GenreEnum,
        required: true
    },
    playlist: {
        type: [Song],
        required: true
    }
});

let Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;