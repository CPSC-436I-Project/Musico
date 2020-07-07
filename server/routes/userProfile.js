const express = require('express');
const router = express.Router();
const UserProfile = require('../mongoDB/models/userProfileModel');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {verifyToken} = require('../authenticate');

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

  // Check email already exists
  const user = await UserProfile.findOne({email: email});
  if (user) return res.status(400).send('User already exists');

  // Hash the password
  const salt = await bcrypt.genSalt();
  const hashedpw = await bcrypt.hash(password, salt);

  const newUserProfile = new UserProfile({
    username: username,
    password: hashedpw,
    email: email
  });

  newUserProfile.save()
      .then(val => res.json({userid: val._id}))
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
  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
  res.header('auth-token', token).send(token);
})

module.exports = router;
