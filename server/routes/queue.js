const express = require('express');
const router = express.Router();
const Queue = require('../mongoDB/models/queueModel');
const {verifyToken} = require('../authenticate');

/**
 * Get all queues
 */
router.get('/', verifyToken, (req, res) => {
    Queue.find()
        .then(queues => {
            res.json(queues)
        })
        .catch(err => {
            console.log(err);
        });
});

/**
 * Get queue for a particular genre
 */
router.get('/:genre', verifyToken, (req, res) => {
    Queue.findOne({channel: req.params.genre})
        .then(queue => {
            res.json(queue["queue"])
        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;
