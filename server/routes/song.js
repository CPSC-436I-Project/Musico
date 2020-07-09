const express = require('express');
const router = express.Router();
const Song = require('../mongoDB/models/songModel');

router.get('/', (req, res) => {
    Song.find()
        .then(songs => {res.json(songs)})
        .catch(err => {console.log(err)});
});

module.exports = router;