const express = require('express');
const router = express.Router();
const Queue = require('../mongoDB/models/queueModel');
const { verifyToken } = require('../authenticate');

router.get('/', verifyToken, (req, res) => {
    Queue.find()
        .then(queues => {res.json(queues)})
        .catch(err => {console.log(err)});
});

module.exports = router;