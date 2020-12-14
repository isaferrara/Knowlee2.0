const Path = require('../models/Path')
const User = require('../models/User')


exports.createPath = async (req, res) => {
    const { title, description, category, userId} = req.body
    const newPath = await Path.create({
      title,
      description,
      category,
      users:userId
    })

    await User.findByIdAndUpdate(userId, { $push: { users: newPath._id } },  {new:true})
    res.status(201).json( newPath)
    
  }

  exports.deletePath = async (req, res) => {
    const { id } = req.params
    await Path.findByIdAndDelete(id)
    res.status(200).json({ message: 'Path deleted' })
  }
  
exports.updatePath = async (req, res) => {
    const { id } = req.params
    const { title, description, category, topics } = req.body
    const pathsy= await Path.findByIdAndUpdate(id, { title, description, category, topics }, {new:true})
    res.status(202).json(pathsy)
  }

exports.getAllPaths = async (req, res) => {
    const paths= await Path.find().populate('topics')
    res.status(200).json(paths)
  }

exports.getSinglePath = async (req, res) => {
    const { id } = req.params
    const path = await Path.findById(id).populate('topics')
    res.status(200).json(path)
  }

  // exports.getAllUserPaths = async (req, res) => {
  //   const paths= await Path.find().populate('topics')
  //   res.status(200).json(paths)
  // }
