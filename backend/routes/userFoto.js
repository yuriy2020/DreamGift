const express = require('express');
const router = express.Router();
const User = require('../models/users');

const multer = require('multer');
const DIR = './public/images/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename: async (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');

    cb(null, file.originalname)
  
    await User.findOneAndUpdate({login}, { userAvatar: fileName })
  }
})
let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

router.post('/user/profile/edit/img/', upload.single('profileImg'), async (req, res, next) => {
  const { filename } = req.file;
  res.json({ filename })
})

module.exports = router;
