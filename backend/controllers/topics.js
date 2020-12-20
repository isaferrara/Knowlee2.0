const Topic = require('../models/Topic')
const Path = require('../models/Path')


exports.createTopic = async (req, res) => {
    const { title, objective, duration, progress, content, pathId } = req.body
    const newTopic = await Topic.create({
        title,
        objective,
        duration,
        progress,
        content, 
        paths:pathId
    })
    await Path.findByIdAndUpdate(pathId, { $push: { topics: newTopic._id }},  {new:true})
    res.status(201).json(newTopic)
    }

exports.deleteTopic = async (req, res) => {
    const { id } = req.params
    const { title} = req.body
    await Topic.findByIdAndDelete(id)
    res.status(200).json({ messaje: 'Topic deleted' })
    }

exports.updateTopic = async (req, res) => {
    const { id } = req.params
    const { title, objective, duration, progress, content, paths} = req.body
    const upTopic =await Topic.findByIdAndUpdate(id, { title, objective, duration, progress, content, paths }, {new:true})

    res.status(202).json(upTopic)
    }

    exports.updateContent = async (req, res) => {
        const { id } = req.params
        const {content} = req.body
        const upTopics =await Topic.findByIdAndUpdate(id, {$push: {  content: content}}, {new:true})
        res.status(202).json(upTopics)
        }


exports.getAllTopic = async (req, res) => {
    const paths= await Topic.find().populate('paths')
    res.status(200).json(paths)
    }

exports.getSingleTopic = async (req, res) => {
    const { id } = req.params
    const topic = await Topic.findById(id).populate('paths')
    res.status(200).json(topic)
    }

