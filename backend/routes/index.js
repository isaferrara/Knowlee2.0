const router = require('express').Router();
const { procutDetail100, procutDetail200, procutDetail300, procutDetail400 } = require('../controllers/products')



router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});

router.get('/api/product/100', procutDetail100)
router.get('/api/product/200', procutDetail200)
router.get('/api/product/300', procutDetail300)
router.get('/api/product/400', procutDetail400)

module.exports = router;
