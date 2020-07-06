var express = require('express');
var router = express.Router();
const Playlist = require('../mongoDB/models/playlistModel');

router.get('/', function(req, res) {
    Playlist.find()
        .then(playlists => {res.send(playlists)})
        .catch(err => {console.log(err)});
});

module.exports = router;