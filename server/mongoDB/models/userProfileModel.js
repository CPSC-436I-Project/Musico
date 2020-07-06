import mongoose from 'mongoose';
import Schema from 'mongoose';
import {GenreEnum} from '../../../app/src/components/index';


const userProfileSchema = new Schema({
    username: String,
    password: String,
    email: String,
    profilePicture: String,
    requests: [mongoose.Types.ObjectId],
    likedSongs: [mongoose.Types.ObjectId],
    favouriteGenres: [GenreEnum],
    channels: [GenreEnum]
});

let UserProfile = mongoose.model("UserProfile", userProfileSchema);
module.exports = UserProfile;