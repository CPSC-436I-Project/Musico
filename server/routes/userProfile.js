const express = require('express');
const router = express.Router();
const UserProfile = require('../mongoDB/models/userProfileModel');

router.get('/', (req, res) => {
  UserProfile.find()
    .then(profiles => {res.json(profiles)})
    .catch(err => {console.log(err)});
});

module.exports = router;
