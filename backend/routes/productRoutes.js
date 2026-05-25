const express = require('express')
const router = express.Router()

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController')


// CREATE
router.post('/', createProduct)

// GET ALL (with filters)
router.get('/', getProducts)

// GET SINGLE PRODUCT
router.get('/:id', getSingleProduct)

// UPDATE PRODUCT
router.put('/:id', updateProduct)

// DELETE PRODUCT
router.delete('/:id', deleteProduct)


module.exports = router