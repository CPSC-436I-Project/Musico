import mongoose from 'mongoose';
import Schema from 'mongoose';
import {GenreEnum} from '../../../app/src/components/index';


const playlistObject = {
    songID: mongoose.Types.ObjectId,
    songName: String,
    artists: [String],
    src: String,
    requesterID: mongoose.Types.ObjectId
};

const playlistSchema = new Schema({
    channel: GenreEnum,
    playlist: [playlistObject]
});

let Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;