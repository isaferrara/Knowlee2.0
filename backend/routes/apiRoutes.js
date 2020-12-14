const { Router } = require('express')
const {
  createPath,
  deletePath,
  getAllPaths,
  getSinglePath,
  updatePath
} = require('../controllers/paths')

const {
  createTopic,
  deleteTopic,
  getAllTopic,
  getSingleTopic,
  updateTopic,
  updateContent
} = require('../controllers/topics')

const { catchErr } = require('../middlewares')

const router = Router()


/// path routes

router.post('/path/create',catchErr(createPath))
router.put('/path/:id', catchErr(updatePath))
router.delete('/path/:id', catchErr(deletePath))
router.get('/path', catchErr(getAllPaths))
router.get('/path/:id', catchErr(getSinglePath))

/// topic routes

router.post('/topic/create', catchErr(createTopic))
router.put('/topic/:id', catchErr(updateTopic))
router.put('/topic/:id', catchErr(updateContent))
router.delete('/topic/:id', catchErr(deleteTopic))
router.get('/topic', catchErr(getAllTopic))
router.get('/topic/:id', catchErr(getSingleTopic))


module.exports = router

