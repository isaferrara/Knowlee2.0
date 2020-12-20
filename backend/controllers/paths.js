const Path = require('../models/Path')
const User = require('../models/User')


exports.createPath = async (req, res) => {
    const { title, description, shortDesc, isFav, progress, level, category, userId} = req.body
    const newPath = await Path.create({
      title,
      description,
      shortDesc,
      isFav,
      progress,
      level,
      category,
      users:userId
    })
    await User.findByIdAndUpdate(userId, { $push: { paths: newPath._id } },  {new:true})
    res.status(201).json( newPath)
    
  }

  exports.deletePath = async (req, res) => {
    const { id } = req.params
    await Path.findByIdAndDelete(id)
    res.status(200).json({ message: 'Path deleted' })
  }
  
exports.updatePath = async (req, res) => {
    const { id } = req.params
    const { title, description, shortDesc, isFav, progress, level, category, topics, users } = req.body
    const pathsy= await Path.findByIdAndUpdate(id, { title, description, shortDesc, isFav, progress, level, category, topics, users }, {new:true})
    res.status(202).json(pathsy)
  }

exports.getAllPaths = async (req, res) => {
    const paths= await Path.find().populate('topics favorites users suscriptions suscribers')
    res.status(200).json(paths)
  }

exports.getSinglePath = async (req, res) => {
    const { id } = req.params
    const path = await Path.findById(id).populate('topics favorites users suscriptions suscribers')
    res.status(200).json(path)
  }

