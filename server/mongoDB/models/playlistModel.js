const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import {GenreEnum} from './GenreEnum';


const playlistSchema = new Schema({
    channel: {
        type: GenreEnum,
        required: true
    },
    playlist: [mongoose.Types.ObjectId]
});

let Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;