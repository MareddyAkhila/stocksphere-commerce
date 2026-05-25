const db = require('./db')

db.serialize(() => {

  // USERS TABLE
  db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  )
  `)

  // PRODUCTS TABLE
  db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price INTEGER,
    stock INTEGER,
    category TEXT,
    image TEXT,
    description TEXT
  )
  `)

  // CART TABLE
  db.run(`
  CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id INTEGER,
    quantity INTEGER
  )
  `)

  // ORDERS TABLE
  db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total_amount INTEGER,
    status TEXT DEFAULT 'Placed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
  `)

  // ORDER ITEMS TABLE
  db.run(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    price INTEGER
  )
  `)

  // INVENTORY LOGS TABLE
  db.run(`
  CREATE TABLE IF NOT EXISTS inventory_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    change_type TEXT,
    quantity INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
  `)

  // ADD DEFAULT PRODUCTS
  db.get(
    `SELECT COUNT(*) as count FROM products`,
    [],
    (err, result) => {

      if (err) {
        console.log(err)
        return
      }

      if (result.count === 0) {

        const products = [

          [
            'Wireless Earbuds',
            1999,
            25,
            'Electronics',
            'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800',
            'Premium ANC Bluetooth Earbuds'
          ],

          [
            'Gaming Headphones',
            2499,
            18,
            'Electronics',
            'https://m.media-amazon.com/images/I/61CGHv6kmWL._SL1500_.jpg',
            'Noise Cancelling Gaming Headphones'
          ],

          [
            'Smart Watch',
            3499,
            20,
            'Electronics',
            'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800',
            'Fitness Smart Watch'
          ],

          [
            'Running Shoes',
            2499,
            30,
            'Fashion',
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
            'Comfortable Running Shoes'
          ],

          [
            'Laptop Backpack',
            1299,
            15,
            'Fashion',
            'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800',
            'Waterproof Laptop Backpack'
          ],

          [
            'Mechanical Keyboard',
            2999,
            10,
            'Electronics',
            'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800',
            'RGB Mechanical Keyboard'
          ],

          [
            'Bluetooth Speaker',
            1799,
            25,
            'Electronics',
            'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800',
            'Portable Bluetooth Speaker'
          ],

          [
            'Office Chair',
            5999,
            8,
            'Furniture',
            'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800',
            'Ergonomic Office Chair'
          ]
        ]

        products.forEach(product => {

          db.run(
            `
            INSERT INTO products
            (
              name,
              price,
              stock,
              category,
              image,
              description
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            product
          )
        })

        console.log(
          'Default Products Added'
        )
      }
    }
  )

  console.log(
    'Database Ready'
  )
})