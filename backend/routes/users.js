const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users');

const saltRounds = 10;
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  console.log(req.body);
  
  try {
    const { login, email, password } = req.body;
    const user = new User({
      login,
      email,
      password: await bcrypt.hash(password, saltRounds)
    });
    await user.save();
    req.session.user = user;
    res.json({ user, auth: true });
  } catch (error) {
    res.json({err: error});
  }
});

router.post('/login', async function(req, res) {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) {
      res.json({ err: 'Login isn`t correct' });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      res.json({ user, auth: true });
    } else {
      res.json({ err: 'Password isn`t correct' });
    }
  } catch (e) {
    res.json({ err: e });
  }
});

router.get('/logout', async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('user_sid');
      res.json({ res: true });
    } catch (error) {
      next(error);
    }
  } else {
    res.json({ res: false });
  }
});

router.get('/check', (req, res) => {
  if (req.session.user) {
    res.json({ res: true });
  } else {
    res.json({ res: false });
  }
});

module.exports = router;
