const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import {GenreEnum} from '../../../app/src/components/index';

const userProfileSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true 
    },
    profilePicture: {
        type: String,
        // default:
    },
    requests: {
        type: [mongoose.Types.ObjectId]
    },
    likedSongs: {
        type: [mongoose.Types.ObjectId]
    },
    // favouriteGenres: [GenreEnum],
    // channels: [GenreEnum]
    favouriteGenres: {
        type: [String]
    },
    channels: {
        type: [String]
    }
});

let UserProfile = mongoose.model("UserProfile", userProfileSchema);
module.exports = UserProfile;