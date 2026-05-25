const db = require('../database/db')


// CREATE PRODUCT
const createProduct = (req, res) => {

  const {
    name,
    description,
    category,
    price,
    stock,
    image
  } = req.body

  if (
    !name ||
    !category ||
    !price ||
    !stock
  ) {
    return res.status(400).json({
      message:
      'Please fill all required fields'
    })
  }

  const sql = `
    INSERT INTO products
    (
      name,
      description,
      category,
      price,
      stock,
      image
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `

  db.run(
    sql,
    [
      name,
      description,
      category,
      price,
      stock,
      image
    ],

    function(err) {

      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }

      res.status(201).json({
        message:
        'Product Created Successfully',
        productId:
        this.lastID
      })
    }
  )
}


// GET ALL PRODUCTS
const getProducts =
(req, res) => {

  const {
    search,
    category,
    minPrice,
    maxPrice
  } = req.query

  let sql =
  `SELECT * FROM products
   WHERE 1=1`

  const params = []

  if (search) {
    sql +=
    ` AND name LIKE ?`

    params.push(
      `%${search}%`
    )
  }

  if (category) {
    sql +=
    ` AND category = ?`

    params.push(category)
  }

  if (minPrice) {
    sql +=
    ` AND price >= ?`

    params.push(minPrice)
  }

  if (maxPrice) {
    sql +=
    ` AND price <= ?`

    params.push(maxPrice)
  }

  db.all(
    sql,
    params,

    (err, rows) => {

      if (err) {
        return res.status(500).json({
          error:
          err.message
        })
      }

      res.json(rows)
    }
  )
}


// GET SINGLE PRODUCT
const getSingleProduct =
(req, res) => {

  const { id } =
  req.params

  db.get(
    `
    SELECT *
    FROM products
    WHERE id = ?
    `,
    [id],

    (err, row) => {

      if (err) {
        return res.status(500).json({
          error:
          err.message
        })
      }

      if (!row) {
        return res.status(404).json({
          message:
          'Product Not Found'
        })
      }

      res.json(row)
    }
  )
}


// UPDATE PRODUCT
const updateProduct =
(req, res) => {

  const { id } =
  req.params

  const {
    name,
    price,
    stock,
    category,
    image,
    description
  } = req.body

  db.run(
    `
    UPDATE products
    SET
      name = ?,
      price = ?,
      stock = ?,
      category = ?,
      image = ?,
      description = ?
    WHERE id = ?
    `,
    [
      name,
      price,
      stock,
      category,
      image,
      description,
      id
    ],

    function(err) {

      if (err) {
        return res.status(500).json({
          error:
          err.message
        })
      }

      res.json({
        message:
        'Product Updated'
      })
    }
  )
}


// DELETE PRODUCT
const deleteProduct =
(req, res) => {

  const { id } =
  req.params

  db.run(
    `
    DELETE FROM products
    WHERE id = ?
    `,
    [id],

    function(err) {

      if (err) {
        return res.status(500).json({
          error:
          err.message
        })
      }

      res.json({
        message:
        'Product Deleted Successfully'
      })
    }
  )
}


module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
}