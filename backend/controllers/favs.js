const Fav = require('../models/Fav')
const User = require('../models/User')


exports.createFav = async (req, res) => {
    const {userId, pathId, topicId} = req.body
    const newPath = await Fav.create({
      users:userId,
      paths:pathId,
      topics:topicId
    })
    await User.findByIdAndUpdate(userId, { $push: { favorites: newPath._id } },  {new:true})
    res.status(201).json( newPath)
    
  }

  exports.deleteFav = async (req, res) => {
    const { id } = req.params
    await Fav.findByIdAndDelete(id)
    res.status(200).json({ message: 'Fav deleted' })
  }
  

exports.getAllFavs = async (req, res) => {
    const fav= await Fav.find().populate('paths').populate('topics').exec();
    res.status(200).json(fav)
  }

exports.getSingleFav= async (req, res) => {
    const { id } = req.params
    const fav = await Fav.findById(id).populate('paths').populate('topics').exec();
    res.status(200).json(fav)
  }

