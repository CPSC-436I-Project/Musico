const express = require('express');
const router = express.Router();
const Song = require('../mongoDB/models/songModel');
const Queue = require('../mongoDB/models/queueModel');
const Playlist = require('../mongoDB/models/playlistModel');
const {verifyToken} = require('../authenticate');
const UserProfile = require('../mongoDB/models/userProfileModel');

/**
 * Get all songs
 */
router.get('/', verifyToken, (req, res) => {
    Song.find()
        .then(songs => {
            res.json(songs);
        })
        .catch(err => {
            console.log(err);
        });
});

/**
 * Get a song by ID
 */
router.get('/:id', verifyToken, (req, res) => {
    Song.findOne({_id: req.params.id})
        .then(song => {
            res.json(song);
        })
        .catch(err => {
            console.log(err);
        })
});

/**
 * Update a song when it get upvoted
 */
router.patch('/upvote/:id', verifyToken, async (req, res) => {
    let userLiked = await UserProfile.findById(req.user._id).then(user => user.likedSongs)
    if (!userLiked.includes(req.params.id)) {
        Song.findOneAndUpdate({_id: req.params.id}, {$inc: {numVotes: 1}})
            .then(async song => {
                await UserProfile.findByIdAndUpdate(req.user._id, {$push: {likedSongs: song._id}})
                    .then(() => {
                        res.json({update: true, id: song._id});
                    })
            })
            .catch(err => {
                res.status(400).json(err);
                console.log(err);
            });
    } else {
        res.json({update: false})
    }
});

/**
 * Update a song when it get downvoted
 */
router.patch('/downvote/:id', verifyToken, async (req, res) => {
    let userLiked = await UserProfile.findById(req.user._id).then(user => user.likedSongs)
    Song.findOneAndUpdate({_id: req.params.id}, {$inc: {numVotes: -1}})
        .then(async song => {
            if (userLiked.includes(req.params.id)) {
                await UserProfile.findByIdAndUpdate(req.user._id, {$pull: {likedSongs: song._id}})
                    .then(() => {
                        res.json({update: true, id: song._id});
                    })
            }
            res.json({update: false});
        })
        .catch(err => {
            res.status(400).json(err);
            console.log(err);
        });
});

/**
 * Add a new song with 1 vote to the general song collection, the queue for the room it was added from and the user's list of requested songs
 */
router.post('/add', verifyToken, async (req, res) => {
    let song = await Song.findOne({src: req.body.src});

    if (!song) {
        const newSong = new Song({
            songName: req.body.songName,
            genre: req.body.genre,
            src: req.body.src,
            duration: req.body.duration,
            requesterID: req.user._id,
            albumCover: req.body.albumCover,
            numVotes: req.body.numVotes
        });
        song = await newSong.save();
    } else {
        await Song.findByIdAndUpdate(song._id, {numVotes: 1});
    }
    return Queue.findOneAndUpdate(
        {channel: req.body.genre},
        {$addToSet: {queue: song._id}})
        .then(() => {
            return Playlist.findOneAndUpdate(
                {channel: req.body.genre},
                {$addToSet: {playlist: song._id}},
                {new: true, useFindAndModify: false},
                (err, playlist) => {
                    if (err) {
                        res.json('Error: ' + err);
                    } else {
                        res.json(song);
                    }
                }
            )
        })
        .then(() => {
            return UserProfile.findByIdAndUpdate(req.user._id, {
                $addToSet: {likedSongs: song._id},
                $addToSet: {requests: song._id}
            })
        })
        .catch((err) => {
            console.log(err);
            res.json('Error: ' + err);
        });
});

module.exports = router;
