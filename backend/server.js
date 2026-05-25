const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

require('./database/initDB')

const db = require('./database/db')

const productRoutes =
require('./routes/productRoutes')

const cartRoutes =
require('./routes/cartRoutes')

const orderRoutes =
require('./routes/orderRoutes')

const dashboardRoutes =
require('./routes/dashboardRoutes')


// API ROUTES
app.use(
  '/api/products',
  productRoutes
)

app.use(
  '/api/cart',
  cartRoutes
)

app.use(
  '/api/orders',
  orderRoutes
)

app.use(
  '/api/dashboard',
  dashboardRoutes
)


// HOME ROUTE
app.get('/', (req, res) => {
  res.send(
    'StockSphere Commerce API Running'
  )
})


// SERVER
const PORT =
process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  )
})