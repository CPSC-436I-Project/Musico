var express = require('express');
var router = express.Router();
const Chat = require('../mongoDB/models/chatModel');

router.get('/chats', function(req, res, next) {
    Chat.find()
        .then(doc => {res.send(doc)})
        .catch(err => {console.log(err)});
});

module.exports = router;