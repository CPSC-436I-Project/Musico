var express = require('express');
var router = express.Router();
const Queue = require('../mongoDB/models/queueModel');

router.get('/queues', function(req, res, next) {
    Queue.find()
        .then(doc => {res.send(doc)})
        .catch(err => {console.log(err)});
});

module.exports = router;