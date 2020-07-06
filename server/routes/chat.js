var express = require('express');
var router = express.Router();
const Chat = require('../mongoDB/models/chatModel');

router.get('/', (req, res) => {
    Chat.find()
        .then(chats => res.json(chats))
        .catch(err => {console.log(err)})
});

module.exports = router;