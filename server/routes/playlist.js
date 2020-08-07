const express = require('express');
const router = express.Router();
const Playlist = require('../mongoDB/models/playlistModel');
const { verifyToken } = require('../authenticate');

/**
 * Get default playlists
 */
router.get('/', verifyToken, (req, res) => {
    Playlist.find()
        .then(playlists => {res.send(playlists)})
        .catch(err => {console.log(err)});
});

module.exports = router;