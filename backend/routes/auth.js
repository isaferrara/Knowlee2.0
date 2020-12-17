const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require('../models/User')

const { isAuth } = require('../middlewares')
const { signup, login, logout, currentUser, edit, googleInit, googleCb, getAllUsers, getSingleUser } = require('../controllers/auth')
// Bcrypt to encrypt passwords


router.post("/login", login);

router.post("/signup", signup);

router.get('/current-user', currentUser)

router.get("/logout",isAuth, logout);

router.put("/edit/:id",isAuth, edit)

router.get('/google', googleInit)

router.get('/google/callback', googleCb)

router.get('/profile', isAuth, (req, res, next) => {
    User.findById(req.user._id)
      .then((user) => res.status(200).json({ user }))
      .catch((err) => res.status(500).json({ err }));
  });

router.get('/user', getAllUsers)

router.get('/user/:id', getSingleUser)

module.exports = router;