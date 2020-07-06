var express = require('express');
var router = express.Router();
const Playlist = require('../mongoDB/models/playlistModel');

router.get('/playlists', function(req, res, next) {
    Playlist.find()
        .then(doc => {res.send(doc)})
        .catch(err => {console.log(err)});
});

module.exports = router;