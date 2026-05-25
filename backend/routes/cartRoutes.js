const express = require('express')

const router = express.Router()

const {
  addToCart,
  getCart,
  removeCartItem
} = require('../controllers/cartController')



router.post('/', addToCart)

router.get('/:userId', getCart)

router.delete('/:id', removeCartItem)



module.exports = router