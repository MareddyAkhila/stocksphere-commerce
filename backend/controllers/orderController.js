const db =
require('../database/db')


// PLACE ORDER
const placeOrder =
(req, res) => {

  const {
    user_id,
    items
  } = req.body

  let totalAmount = 0

  const productIds =
  items.map(
    item =>
    item.product_id
  )

  const placeholders =
  productIds
  .map(() => '?')
  .join(',')

  db.all(
    `
    SELECT *
    FROM products
    WHERE id IN
    (${placeholders})
    `,
    productIds,

    (err, products) => {

      if (err) {
        return res
        .status(500)
        .json(err)
      }

      for (
        let item of items
      ) {

        const product =
        products.find(
          p =>
          p.id ===
          item.product_id
        )

        if (
          !product
        ) {
          return res
          .status(404)
          .json({
            message:
            'Product Not Found'
          })
        }

        if (
          product.stock <
          item.quantity
        ) {
          return res
          .status(400)
          .json({
            message:
            `${product.name}
            stock insufficient`
          })
        }

        totalAmount +=
        product.price *
        item.quantity
      }

      db.run(
        `
        INSERT INTO orders
        (
          user_id,
          total_amount,
          status
        )
        VALUES
        (?, ?, ?)
        `,
        [
          user_id,
          totalAmount,
          'Placed'
        ],

        function(err) {

          const orderId =
          this.lastID

          items.forEach(
            item => {

            const product =
            products.find(
              p =>
              p.id ===
              item.product_id
            )

            db.run(
              `
              INSERT INTO
              order_items
              (
                order_id,
                product_id,
                quantity,
                price
              )
              VALUES
              (?, ?, ?, ?)
              `,
              [
                orderId,
                item.product_id,
                item.quantity,
                product.price
              ]
            )

            db.run(
              `
              UPDATE products
              SET stock =
              stock - ?
              WHERE id = ?
              `,
              [
                item.quantity,
                item.product_id
              ]
            )
          })

          res.json({
            message:
            'Order Placed',
            orderId
          })
        }
      )
    }
  )
}


// GET ORDERS
const getOrders =
(req, res) => {

  db.all(
    `
    SELECT *
    FROM orders
    ORDER BY id DESC
    `,
    [],

    (err, rows) => {

      if (err) {
        return res
        .status(500)
        .json(err)
      }

      res.json(rows)
    }
  )
}


// UPDATE STATUS
const updateOrderStatus =
(req, res) => {

  const {
    status
  } = req.body

  const {
    id
  } = req.params

  db.run(
    `
    UPDATE orders
    SET status = ?
    WHERE id = ?
    `,
    [status, id],

    function(err) {

      if (err) {
        return res
        .status(500)
        .json(err)
      }

      res.json({
        message:
        'Status Updated'
      })
    }
  )
}


// CANCEL ORDER
const cancelOrder =
(req, res) => {

  const {
    id
  } = req.params

  db.all(
    `
    SELECT *
    FROM order_items
    WHERE order_id = ?
    `,
    [id],

    (err, items) => {

      items.forEach(
        item => {

        db.run(
          `
          UPDATE products
          SET stock =
          stock + ?
          WHERE id = ?
          `,
          [
            item.quantity,
            item.product_id
          ]
        )
      })

      db.run(
        `
        UPDATE orders
        SET status =
        'Cancelled'
        WHERE id = ?
        `,
        [id]
      )

      res.json({
        message:
        'Order Cancelled'
      })
    }
  )
}


module.exports = {
  placeOrder,
  getOrders,
  updateOrderStatus,
  cancelOrder
}