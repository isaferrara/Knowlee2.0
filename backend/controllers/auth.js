const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const Path = require('../models/Path')

exports.signup = async (req, res) => {
  const { username, password, email, image} = req.body
  if (!username || !password) {
    return res
      .status(403)
      .json({ message: 'Provide username and password' })
  }
  const user = await User.findOne({ username })
  if (user) {
    return res
    .status(400)
    .json({ message: 'Something went wrong authenticating user' } )
 

  }

  const hashPass = bcrypt
    .hashSync(password, bcrypt.genSaltSync(12))

  const newUser = await User.create({
    email,
    username,
    password: hashPass,
    image
  })
  newUser.password = null
  res.status(201).json(newUser)
  res.redirect('/login')
}


exports.login = async (req, res, next) => {
  passport.authenticate('local', (
    err,
    user,
    failureDetails
  ) => {
    if (err) {
      return res
        .status(500)
        .json({ message: 'Something went wrong authenticating user' })
    }
    if (!user) {
      return res.status(401).json(failureDetails)
    }


    req.login(user, err => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Something went wrong authenticating user' })
      }
      user.password = null
      res.status(200).json(user)
    })
  })(req, res, next)
}

  exports.currentUser = (req, res) => {
    res.json(req.user || null)
  }

exports.logout = (req, res) => {
  req.logout()
  res.status(200).json({ message: 'OK' })
  res.redirect('/')
}

exports.edit = async (req, res) => {
  const { id } = req.params
  const { username, name, email, image, suscribers, paths, suscriptions, favorites } = req.body

 const updated= await User.findByIdAndUpdate(id, { email, username, name, suscribers, image, paths, suscriptions, favorites }, {new:true})

  res.status(202).json(updated)
}

exports.getAllUsers = async (req, res) => {
  const user= await User.find().populate('users').populate('paths').populate('favorites').populate('suscriptions').populate('suscribers')
  res.status(200).json(user)
}

exports.getSingleUser= async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id).populate('users').populate('paths').populate('favorites').populate('suscriptions').populate('suscribers')
  res.status(200).json(user)
}

exports.googleInit = passport.authenticate('google', {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
})

exports.googleCb = (req, res, next) => {
  passport.authenticate('google', (err, user, errDetails) => {
    if (err) return res.status(500).json({ err, errDetails })
    if (!user) return res.status(401).json({ err, errDetails })

    req.login(user, err => {
      if (err) return res.status(500).json({ err })
      return res.redirect('/')
    })
  })(req, res, next)
}
