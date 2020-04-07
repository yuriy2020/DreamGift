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
      password: await bcrypt.hash(password, saltRounds),
    });
    await user.save();
    req.session.user = user;
    res.json({ user, auth: true });
  } catch (error) {
    res.json({ err: error });
  }
});

router.post('/login', async function (req, res) {
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

router.post('/savetegs', async (req, res) => {
  await User.updateOne({ login: req.body.login }, { heshtegs: req.body.heshtegs });
  res.json();
});

router.post('/savepresents', async (req, res) => {
  await User.updateOne({ login: req.body.login }, { presents: req.body.presents });
  res.json();
});

router.post('/changeinfo', async (req, res) => {
  console.log(req.body);

  const entries = Object.entries(req.body);
  console.log(entries);

  for (const [key, value] of entries) {
    if (key !== 'login' && value.length) {
      console.log(key, value);

      await User.updateOne({ login: req.body.login }, { [key]: value });
    }
  }
  res.json();
});

router.post('/friendsSearch', async (req, res) => {
  if (req.session.user) {
    let users = await User.find();
    res.json({ users });
  }
});

router.post('/addFriend', async (req, res) => {
  let user = await User.findOne({ login: req.session.user.login });
  let foundUser = user.friends.find((element) => element === req.body.friend);
  if (foundUser === undefined) {
    await User.updateOne({ login: req.session.user.login }, { $push: { friends: req.body.friend } });
  }
  res.json({ user });
});

router.post('/removeFriend', async (req, res) => {
  let user = await User.findOne({ login: req.session.user.login });
  const index = user.friends.indexOf(req.body.login);
  const newFriends = user.friends.slice();
  newFriends.splice(index, 1);
  await User.updateOne({ login: req.session.user.login }, { friends: newFriends });
  res.json({ newFriends });
});

router.post('/onlyMyFriend', async (req, res) => {
  let users = await User.findOne({ login: req.session.user.login });
  let myFriend = users.friends;
  res.json({ myFriend });
});

router.post('/page/:login', async (req, res) => {
  const user = await User.findOne({ login: req.params.login });
  res.json({ user });
});

module.exports = router;
