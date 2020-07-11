var express = require('express');
var router = express.Router();
const Playlist = require('../mongoDB/models/playlistModel');

router.get('/', function(req, res) {
    Playlist.find()
        .then(playlists => {res.send(playlists)})
        .catch(err => {console.log(err)});
});

router.post('/add', (req, res) => {
    const newSong = {
        songName: req.body.songName,
        artists: req.body.artists,
        genre: req.body.genre,
        src: req.body.src,
        requesterID: req.body.requesterID,
        albumCover: req.body.albumCover,
        numVotes: req.body.numVotes
    }

    Playlist.findOneAndUpdate(
        {channel: req.body.genre},
        {$push: {playlist: newSong}},
        {new: true, useFindAndModify: false},
        (err, playlist) => {
            if (err) {
                return res.send(err)
            } else {
                return res.json(playlist)
            }
        }
    )
})

module.exports = router;