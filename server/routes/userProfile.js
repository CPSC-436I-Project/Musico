const express = require('express');
const router = express.Router();
const UserProfile = require('../mongoDB/models/userProfileModel');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {verifyToken, createToken} = require('../authenticate');

router.get('/', verifyToken, (req, res) => {
  UserProfile.find()
    .then(profiles => {res.json(profiles)})
    .catch(err => {console.log(err)});
});

router.post('/register', async (req, res) => {

  // Validate
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const profilePicture = "https://img.icons8.com/ios-glyphs/30/000000/cat-profile--v1.png";

  // Check email already exists
  const user = await UserProfile.findOne({email: email});
  if (user) return res.status(400).send('User already exists');

  // Hash the password
  const salt = await bcrypt.genSalt();
  const hashedpw = await bcrypt.hash(password, salt);

  const newUserProfile = new UserProfile({
    username: username,
    password: hashedpw,
    email: email,
    profilePicture: profilePicture
  });

  newUserProfile.save()
      .then(val => {
        const token = createToken(val._id);
        res.json({id: val._id, username: val.username, email: val.email, profilePicture: val.profilePicture, token: token})
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/login', async (req, res) => {
  // Validate
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const password = req.body.password;
  const email = req.body.email;

  // Check the email
  const user = await UserProfile.findOne({email: email});
  if (!user) return res.status(400).send('Invalid email or password');

  // Check the password
  const validpw = await bcrypt.compare(password, user.password);
  if (!validpw) return res.status(400).send('Invalid email or password');

  // Create a token
  const token = createToken(user._id);
  res.header('auth-token', token).json({id: user._id, username: user.username, email: user.email, profilePicture: user.profilePicture, token: token});
})

module.exports = router;
