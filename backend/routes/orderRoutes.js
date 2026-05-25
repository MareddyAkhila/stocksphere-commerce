const express =
require('express')

const router =
express.Router()

const {
  placeOrder,
  getOrders,
  updateOrderStatus,
  cancelOrder
} =
require(
'../controllers/orderController'
)

router.post('/',placeOrder)

router.get('/',getOrders)

router.put('/:id/status',updateOrderStatus)

router.put('/:id/cancel',cancelOrder)

module.exports = router