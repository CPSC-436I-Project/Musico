var express = require('express');
var router = express.Router();
const UserProfile = require('../mongoDB/models/userProfileModel');

router.get('/userProfiles', function(req, res, next) {
  UserProfile.find()
      .then(doc => {res.send(doc)})
      .catch(err => {console.log(err)});
});

module.exports = router;
