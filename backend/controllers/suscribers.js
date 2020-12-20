const Suscription = require('../models/Suscription')
const User = require('../models/User')


exports.createSubscription = async (req, res) => {
    const {userId, pathId, myId} = req.body
    const newUser = await Suscription.create({
      me: myId,
      user: userId,
      paths: pathId,
    })
    res.status(201).json( newUser)
    
  }

  exports.deleteSuscriber = async (req, res) => {
    const { id } = req.params
    await Suscription.findByIdAndDelete(id)
    res.status(200).json({ message: 'Path deleted' })
  }
  

exports.getAllSuscribers = async (req, res) => {
    const suscription= await Suscription.find().populate('paths ').populate('user')
    res.status(200).json(suscription)
  }

  exports.getSingleSuscriber = async (req, res) => {
    const { id } = req.params
    const suscription = await Suscription.findById(id).populate('paths ').populate('user')
    res.status(200).json(suscription)
  }

