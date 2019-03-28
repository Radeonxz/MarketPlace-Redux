const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const config = require(path.join(__base, 'config/config'));
const auth = require(path.join(__base, 'middleware/auth'));

// User Model
const User = require(path.join(__base, 'models/User'));

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  //validation
  if(!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  //check for existing user
  User.findOne({ email })
  .then(user => {
    if(!user) return res.status(400).json({ msg: 'User does not exist' });

    //validate password
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      jwt.sign(
        //payload, secret, expiration, callback
        { id: user.id }, config.JWTSecret, { expiresIn: 3600 }, (err, token) => {
          if(err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
  .select('-password')
  .then(user => res.json(user));
});

module.exports = router;