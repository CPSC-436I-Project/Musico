const express = require('express');
const router = express.Router();
const Queue = require('../mongoDB/models/queueModel');

router.get('/', (req, res) => {
    Queue.find()
        .then(queues => {res.json(queues)})
        .catch(err => {console.log(err)});
});

module.exports = router;