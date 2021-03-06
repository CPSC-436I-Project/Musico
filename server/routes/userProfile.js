const express = require('express');
const router = express.Router();
const UserProfile = require('../mongoDB/models/userProfileModel');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {verifyToken, createToken} = require('../authenticate');

/**
 * Get all user profiles
 */
router.get('/', verifyToken, (req, res) => {
    UserProfile.find()
        .then(profiles => {
            res.json(profiles)
        })
        .catch(err => {
            console.log(err)
        });
});

/**
 * Validate a new user and add it's profile
 */
router.post('/register', async (req, res) => {
    // Validate
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    // Check email already exists
    const user = await UserProfile.findOne({email: email});
    if (user) return res.status(400).send('User already exists');

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedpw = await bcrypt.hash(password, salt);

    const newUserProfile = new UserProfile({
        username: username,
        password: hashedpw,
        email: email
    });

    newUserProfile.save()
        .then(val => {
            const token = createToken(val._id);
            res.json({
                id: val._id,
                username: val.username,
                email: val.email,
                profilePicture: val.profilePicture,
                requests: val.requests,
                likedSongs: val.likedSongs,
                favouriteGenres: val.favouriteGenres,
                channels: val.channels,
                token: token
            })
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Validate a login and get the user's profile
 */
router.post('/login', async (req, res) => {
    // Validate
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const password = req.body.password;
    const email = req.body.email;

    // Check the email
    const user = await UserProfile.findOne({email: email});
    if (!user) return res.status(400).send('Invalid email or password');

    // Check the password
    const validpw = await bcrypt.compare(password, user.password);
    if (!validpw) return res.status(400).send('Invalid email or password');

    // Create a token
    const token = createToken(user._id);
    res.header('auth-token', token).json({
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        requests: user.requests,
        likedSongs: user.likedSongs,
        favouriteGenres: user.favouriteGenres,
        channels: user.channels,
        token: token
    });
});

/**
 * Auto-login a user from their authentication token and get their profile
 */
router.get('/getFromToken', verifyToken, async (req, res) => {
    const user = await UserProfile.findById(req.user._id);
    res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        requests: user.requests,
        likedSongs: user.likedSongs,
        favouriteGenres: user.favouriteGenres,
        channels: user.channels
    });
});

/**
 * Get a user profile by ID
 */
router.get('/username/:id', verifyToken, async (req, res) => {
    const user = await UserProfile.findById(req.params.id);
    if (user !== undefined && user !== null) {
        res.json({
            id: user._id,
            username: user.username,
            profilePicture: user.profilePicture,
            favouriteGenres: user.favouriteGenres,
        });
    } else {
        res.json({id: "invalid", username: "Deleted User"});
    }
});

/**
 * Update a user's profile picture
 */
router.patch('/updateProfilePic', verifyToken, (req, res) => {
    UserProfile.findOneAndUpdate({_id: req.user._id}, {profilePicture: req.body.profilePictureURL})
        .then(() => {
            return res.send('Updated Profile Picture');
        })
        .catch(() => {
            return res.status(400).send('Invalid user');
        })
});

/**
 * Update a user's liked genres
 */
router.patch('/updateLikedGenres', verifyToken, (req, res) => {
    UserProfile.findById(req.user._id)
        .then(user => user.favouriteGenres)
        .then((likedGenres) => {
            let origLen = likedGenres.length;
            let modGenres = likedGenres.filter(genre => genre !== req.body.genre);
            let modLen = modGenres.length;
            if (origLen === modLen) {
                return UserProfile.findOneAndUpdate({_id: req.user._id},
                    {$push: {favouriteGenres: req.body.genre}},
                    {new: true, useFindAndModify: false})
                    .then((response) => {
                        return res.send(response.favouriteGenres);
                    })
                    .catch((err) => {
                        return res.status(400).send('Invalid user');
                    })
            } else {
                return UserProfile.findOneAndUpdate({_id: req.user._id},
                    {favouriteGenres: modGenres},
                    {new: true, useFindAndModify: false})
                    .then((response) => {
                        return res.send(response.favouriteGenres);
                    })
                    .catch((err) => {
                        return res.status(400).send('Invalid user');
                    })
            }
        })
        .catch(err => {
            console.log(err)
        });
});

module.exports = router;
