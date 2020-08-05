const express = require('express');
const router = express.Router();
const Song = require('../mongoDB/models/songModel');
const Queue = require('../mongoDB/models/queueModel');
const Playlist = require('../mongoDB/models/playlistModel');
const { verifyToken } = require('../authenticate');
const UserProfile = require('../mongoDB/models/userProfileModel');

router.get('/', verifyToken, (req, res) => {
    Song.find()
        .then(songs => {res.json(songs)})
        .catch(err => {console.log(err)});
});

router.get('/:id', verifyToken, (req, res) => {
    Song.findOne({_id: req.params.id})
        .then(song => {
            res.json(song)
        })
        .catch(err => {console.log(err)})
});

router.patch('/upvote/:id', verifyToken, async (req, res) => {
    let userLiked = await UserProfile.findById(req.user._id).then(user => user.likedSongs)
    if (!userLiked.includes(req.params.id)) {
        Song.findOneAndUpdate({_id: req.params.id}, {$inc: {numVotes: 1}})
            .then(async song => {
                await UserProfile.findByIdAndUpdate(req.user._id, {$push: {likedSongs: song._id}})
                res.json(song);
            })
            .catch(err => {
                res.status(400).json(err);
                console.log(err);
            });
    } else {
        res.json("already upvoted!")
    }
})

router.patch('/downvote/:id', verifyToken, async (req, res) => {
    let userLiked = await UserProfile.findById(req.user._id).then(user => user.likedSongs)
    Song.findOneAndUpdate({_id: req.params.id}, {$inc: {numVotes: -1}})
        .then(async song => {
            if (userLiked.includes(req.params.id)) {
                await UserProfile.findByIdAndUpdate(req.user._id, {$pull: {likedSongs: song._id}})
            }
            res.json(song);
        })
        .catch(err => {
            res.status(400).json(err);
            console.log(err);
        });
})


router.get('/:songID', verifyToken, (req, res) => {
    Song.findOne({_id: req.params.songID})
        .then(song => {res.json(song)})
        .catch(err => {console.log(err)});
});

router.post('/add', verifyToken, (req, res) => {
    const newSong = new Song({
        songName: req.body.songName,
        genre: req.body.genre,
        src: req.body.src,
        duration: req.body.duration,
        requesterID: req.user._id,
        albumCover: req.body.albumCover,
        numVotes: req.body.numVotes
    });
    let songId = ""; 
    newSong.save()
        .then((song) => {
            songId = song._id;
            return Queue.findOneAndUpdate(
                {channel: req.body.genre},
                {$push: {queue: songId}})
        })
        .then(() => {
            return Playlist.findOneAndUpdate(
                {channel: req.body.genre},
                {$push: {playlist: newSong}},
                {new: true, useFindAndModify: false},
                (err, playlist) => {
                    if (err) {
                        res.json('Error: ' + err)
                    } else {
                        res.json(newSong)
                    }
                }
            )
        })
        .then(() => {
            return UserProfile.findByIdAndUpdate(req.user._id, {$push: {likedSongs: songId}, $push: {requests: songId}})
        })
        .catch((err) => {
            console.log(err);
            res.json('Error: ' + err);
        });
})

module.exports = router;
