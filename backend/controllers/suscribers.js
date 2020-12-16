const Suscription = require('../models/Suscription')
const User = require('../models/User')


exports.createSuscriber = async (req, res) => {
    const {userId} = req.body
    const newPath = await Suscription.create({
      users:userId
    })
    await User.findByIdAndUpdate(userId, { $push: { suscriptions: newPath._id } },  {new:true})
    res.status(201).json( newPath)
    
  }

  exports.deleteSuscriber = async (req, res) => {
    const { id } = req.params
    await Suscription.findByIdAndDelete(id)
    res.status(200).json({ message: 'Path deleted' })
  }
  

exports.getAllSuscribers = async (req, res) => {
    const suscription= await Suscription.find().populate('paths')
    res.status(200).json(suscription)
  }

exports.getSingleSuscriber = async (req, res) => {
    const { id } = req.params
    const suscription = await Suscription.findById(id).populate('paths')
    res.status(200).json(suscription)
  }

