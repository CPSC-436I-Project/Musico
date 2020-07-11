var express = require('express');
var router = express.Router();
const Chat = require('../mongoDB/models/chatModel');
const { verifyToken } = require('../authenticate');

router.get('/:genre', verifyToken, (req, res) => {
    Chat.findOne({channel: req.params.genre})
        .then(chats => res.json(chats["messages"]))
        .catch(err => {console.log(err)})
});

router.post('/:genre', verifyToken, async (req, res) => {
    const newMessage = {
        user: req.user._id,
        message: req.body.message
    };

    var messages = await Chat.findOne({channel: req.params.genre})
        .then(chats => chats["messages"])
        .catch(err => {console.log(err)});
    
    // TODO: make sure messages is a list
    console.log(messages);

    messages.push(newMessage);

    Chat.findOneAndUpdate({channel: req.params.genre}, {messages: messages})
    .then(m => res.json(m))
    .catch(err => res.status(400).json('Error: ' + err));

});



module.exports = router;