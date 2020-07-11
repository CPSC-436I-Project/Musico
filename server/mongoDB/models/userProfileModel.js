const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let defaultProfilePic = "https://img.icons8.com/ios-glyphs/30/000000/cat-profile--v1.png"

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
        enum: ["Electronic", "Rock", "Lo-Fi", "Reggae", "Country", "Hip-Hop", "Jazz", "Rap"]
    },
    channels: {
        type: [String],
        enum: ["Electronic", "Rock", "Lo-Fi", "Reggae", "Country", "Hip-Hop", "Jazz", "Rap"]
    }
});

let UserProfile = mongoose.model("UserProfile", userProfileSchema);
module.exports = UserProfile;