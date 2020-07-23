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

router.get('/:songID', verifyToken, (req, res) => {
    Song.findOne({_id: req.params.songID})
        .then(song => {res.json(song)})
        .catch(err => {console.log(err)});
});

router.post('/add', verifyToken, async (req, res) => {
    const newSong = new Song({
        songName: req.body.songName,
        artists: req.body.artists,
        genre: req.body.genre,
        src: req.body.src,
        requesterID: req.body.requesterID,
        albumCover: req.body.albumCover,
        numVotes: req.body.numVotes
    })

    newSong.save()
        .then(
            Queue.findOneAndUpdate(
                {channel: req.body.genre}, 
                {$push: {queue: newSong}}, 
                {new: true, useFindAndModify: false},
                (err, docs) => {
                    if (err) {
                        return res.json('Error: ' + err)
                    } else {
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
                    }
            })
        )
        .catch(err => res.json('Error: ' + err));
})

module.exports = router;
