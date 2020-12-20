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


const {
  createSubscription,
  deleteSuscriber,
  getAllSuscribers,
  getSingleSuscriber
} = require('../controllers/suscribers')


const {
  createFav,
  deleteFav,
  getAllFavs,
  getSingleFav
} = require('../controllers/favs')

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


/// suscriber routes

router.post('/subs/create', catchErr(createSubscription))
router.delete('/subs/:id', catchErr(deleteSuscriber))
router.get('/subs', catchErr(getAllSuscribers))
router.get('/subs/:id', catchErr(getSingleSuscriber))

/// fav routes

router.post('/favs/create', catchErr(createFav))
router.delete('/favs/:id', catchErr(deleteFav))
router.get('/favs', catchErr(getAllFavs))
router.get('/favs/:id', catchErr(getSingleFav))

module.exports = router

