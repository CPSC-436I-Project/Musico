const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import {GenreEnum} from '../../../app/src/components/index';


const playlistObject = {
    songID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
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
    }
};

const playlistSchema = new Schema({
    // channel: GenreEnum,
    channel: String,
    playlist: [playlistObject]
});

let Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;