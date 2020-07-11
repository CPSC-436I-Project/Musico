const express = require('express');
const router = express.Router();
const Queue = require('../mongoDB/models/queueModel');

router.get('/', (req, res) => {
    Queue.find()
        .then(queues => {res.json(queues)})
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
    
    Queue.findOneAndUpdate(
        {channel: req.body.genre}, 
        {$push: {queue: newSong}}, 
        {new: true, useFindAndModify: false},
        (err, queue) => {
            if (err) {
                return res.send(err)
            } else {
                return res.json(queue)
            }
    });
})

module.exports = router;