const express = require('express');
const router = express.Router();
const Song = require('../mongoDB/models/songModel');

router.get('/', (req, res) => {
    Song.find()
        .then(songs => {res.json(songs)})
        .catch(err => {console.log(err)});
});

router.get('/:songID', (req, res) => {
    Song.find({_id: req.params.songID})
        .then(song => {res.json(song)})
        .catch(err => {console.log(err)});
});

router.post('/add', (req, res) => {
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
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;