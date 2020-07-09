const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import {GenreEnum} from '../../../app/src/components/index';


const playlistSchema = new Schema({
    // channel: GenreEnum,
    channel: {
        type: String,
        required: true
    },
    playlist: [mongoose.Types.ObjectId]
});

let Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;