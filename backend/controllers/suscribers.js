const Suscription = require('../models/Suscription')
const User = require('../models/User')


exports.createSuscriber = async (req, res) => {
    const {suscribersId} = req.body
    const newPath = await Suscription.create({
      suscribers: suscribersId,
    })
    await User.findByIdAndUpdate(suscribersId, { $push: { suscribers: newPath._id} },  {new:true})
    res.status(201).json( newPath)
    
  }

  exports.createSubscription = async (req, res) => {
    const {suscriptionId} = req.body
    const newPath = await Suscription.create({
      suscriptions: suscriptionId  
    })
    await User.findByIdAndUpdate(suscriptionId, { $push: { suscriptions: newPath._id} },  {new:true})
    res.status(201).json( newPath)
    
  }

  exports.deleteSuscriber = async (req, res) => {
    const { id } = req.params
    await Suscription.findByIdAndDelete(id)
    res.status(200).json({ message: 'Path deleted' })
  }
  

exports.getAllSuscribers = async (req, res) => {
    const suscription= await Suscription.find().populate(' paths users')
    res.status(200).json(suscription)
  }

  exports.getSingleSuscriber = async (req, res) => {
    const { id } = req.params
    const suscription = await Suscription.findById(id).populate('paths users')
    res.status(200).json(suscription)
  }

