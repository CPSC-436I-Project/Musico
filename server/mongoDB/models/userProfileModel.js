const mongoose = require('mongoose');
// const uniqueArrayItems =  require('mongoose-unique-array');
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
        enum: ["Asian", "Blues", "Children", "Christian", "Classical", "Country", "Electronic", "Hip-Hop",
            "Independent", "Jazz", "Latin American", "Other", "Pop", "Reggae", "Rock", "Soul"],
        // unique: true
    }
    // channels: {
    //     type: [String],
    //     enum: ["Asian", "Blues", "Children", "Christian", "Classical", "Country", "Electronic", "Hip-Hop",
    //         "Independent", "Jazz", "Latin American", "Other", "Pop", "Reggae", "Rock", "Soul"]
    // }
});

// userProfileSchema.plugin(uniqueArrayItems);
let UserProfile = mongoose.model("UserProfile", userProfileSchema);
module.exports = UserProfile;