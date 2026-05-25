const db = require('../database/db')



// ADD TO CART
const addToCart = (req, res) => {

  const {
    user_id,
    product_id,
    quantity
  } = req.body

  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({
      message: 'All fields are required'
    })
  }

  db.run(
    `
    INSERT INTO cart
    (user_id, product_id, quantity)
    VALUES (?, ?, ?)
    `,
    [user_id, product_id, quantity],
    function(err) {

      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }

      res.status(201).json({
        message: 'Item Added To Cart'
      })
    }
  )
}



// GET USER CART
const getCart = (req, res) => {

  const { userId } = req.params

  const sql = `
    SELECT
      cart.id,
      cart.product_id,
      products.name,
      products.price,
      products.image,
      cart.quantity
    FROM cart
    JOIN products
    ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `

  db.all(sql, [userId], (err, rows) => {

    if (err) {
      return res.status(500).json({
        error: err.message
      })
    }

    res.json(rows)
  })
}



// REMOVE CART ITEM
const removeCartItem = (req, res) => {

  const { id } = req.params

  db.run(
    `DELETE FROM cart WHERE id = ?`,
    [id],
    function(err) {

      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }

      res.json({
        message: 'Cart Item Removed'
      })
    }
  )
}



module.exports = {
  addToCart,
  getCart,
  removeCartItem
}