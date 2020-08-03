const express = require('express');
const router = express.Router();
const Song = require('../mongoDB/models/songModel');
const Queue = require('../mongoDB/models/queueModel');
const Playlist = require('../mongoDB/models/playlistModel');
const { verifyToken } = require('../authenticate');

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

router.patch('/upvote/:id', verifyToken, (req, res) => {
    Song.findOneAndUpdate({_id: req.params.id}, {$inc: {numVotes: 1}})
        .then(song => {
            res.json(song)
        })
        .catch(err => {
            res.status(400).json(err);
            console.log(err);
        });
})

router.patch('/downvote/:id', verifyToken, (req, res) => {
    Song.findOneAndUpdate({_id: req.params.id}, {$inc: {numVotes: -1}})
        .then(song => {
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

    newSong.save()
        .then((song) => {
            console.log(song)
            return Queue.findOneAndUpdate(
                {channel: req.body.genre},
                {$push: {queue: song._id}})
        })
        .then(() => {
            console.log("done");
            Playlist.findOneAndUpdate(
                {channel: req.body.genre},
                {$push: {playlist: newSong}},
                {new: true, useFindAndModify: false},
                (err, playlist) => {
                    if (err) {
                        return res.json('Error: ' + err)
                    } else {
                        return res.json(playlist)
                    }
                }
            )
            return res.json(newSong);
        })
        .catch((err) => {
            console.log(err);
            return res.json('Error: ' + err);
        });
})

module.exports = router;
