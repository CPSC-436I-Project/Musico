const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let defaultProfilePic = "https://i.imgur.com/6qet8nK.png"

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
        default: defaultProfilePic
    },
    requests: {
        type: [mongoose.Types.ObjectId]
    },
    likedSongs: {
        type: [mongoose.Types.ObjectId]
    },
    favouriteGenres: {
        type: [String],
        enum: ["Asian", "Blues", "Children", "Christian", "Classical", "Country", "Electronic", "Hip-Hop",
            "Independent", "Jazz", "Latin American", "Other", "Pop", "Reggae", "Rock", "Soul"],
    }
});

let UserProfile = mongoose.model("UserProfile", userProfileSchema);
module.exports = UserProfile;
