import {
  useEffect,
  useState
} from 'react'

import Navbar from '../components/Navbar'
import API from '../services/api'

import './AdminPanelPage.css'

function AdminPanelPage() {

  const [products,
  setProducts] =
  useState([])

  const [orders,
setOrders]
= useState([])

  const [editingId,
  setEditingId] =
  useState(null)

  const [product,
  setProduct] =
  useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: ''
  })

  useEffect(() => {
  fetchProducts()
  fetchOrders()
}, [])

  const fetchProducts =
  async () => {

    try {

      const response =
      await API.get(
        '/products'
      )

      setProducts(
        response.data
      )

    } catch (error) {
      console.log(error)
    }
  }

  const fetchOrders =
async () => {

  try {

    const response =
    await API.get(
      '/orders'
    )

    setOrders(
      response.data
    )

  } catch (error) {
    console.log(error)
  }
}

  const handleChange =
  (e) => {

    setProduct({
      ...product,
      [e.target.name]:
      e.target.value
    })
  }

  const handleSubmit =
  async (e) => {

    e.preventDefault()

    try {

      if (editingId) {

        await API.put(
          `/products/${editingId}`,
          product
        )

        alert(
          'Product Updated'
        )

      } else {

        await API.post(
          '/products',
          product
        )

        alert(
          'Product Added'
        )
      }

      resetForm()
      fetchProducts()

    } catch (error) {
      console.log(error)
    }
  }

  const editProduct =
  (productData) => {

    setEditingId(
      productData.id
    )

    setProduct({
      name:
      productData.name,

      description:
      productData.description,

      category:
      productData.category,

      price:
      productData.price,

      stock:
      productData.stock,

      image:
      productData.image
    })
  }

  const deleteProduct =
  async (id) => {

    try {

      await API.delete(
        `/products/${id}`
      )

      alert(
        'Product Deleted'
      )

      fetchProducts()

    } catch (error) {
      console.log(error)
    }
  }

  const updateOrderStatus =
async (
  id,
  status
) => {

  try {

    await API.put(
      `/orders/${id}/status`,
      { status }
    )

    fetchOrders()

  } catch (error) {
    console.log(error)
  }
}

  const resetForm =
  () => {

    setEditingId(null)

    setProduct({
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
      image: ''
    })
  }

  return (
    <div>

      <Navbar />

      <div className="admin-container">

        <h1>
          Admin Panel
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="admin-form"
        >

          <input
            type="text"
            name="name"
            placeholder=
            "Product Name"
            value={
              product.name
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="text"
            name="description"
            placeholder=
            "Description"
            value={
              product.description
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="text"
            name="category"
            placeholder=
            "Category"
            value={
              product.category
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="number"
            name="price"
            placeholder=
            "Price"
            value={
              product.price
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="number"
            name="stock"
            placeholder=
            "Stock"
            value={
              product.stock
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="text"
            name="image"
            placeholder=
            "Image URL"
            value={
              product.image
            }
            onChange={
              handleChange
            }
            required
          />

          <button
            type="submit"
          >
            {editingId
              ? 'Update Product'
              : 'Add Product'}
          </button>

        </form>

        <h2>
          Product List
        </h2>

        <div className="admin-products">

          {products.map(product => (

            <div
              key={product.id}
              className="admin-card"
            >

              <img
                src={
                  product.image
                }
                alt={
                  product.name
                }
              />

              <h3>
                {product.name}
              </h3>

              <p>
                ₹{
                  product.price
                }
              </p>

              <p>
                Stock:
                {
                  product.stock
                }
              </p>

              <div
                className=
                "btn-group"
              >

                <button
                  className=
                  "edit-btn"
                  onClick={() =>
                    editProduct(
                      product
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className=
                  "delete-btn"
                  onClick={() =>
                    deleteProduct(
                      product.id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

        <h2>
  Manage Orders
</h2>

<div
  className=
  "admin-products"
>

  {orders.map(order => (

    <div
      key={order.id}
      className=
      "admin-card"
    >

      <h3>
        Order #
        {order.id}
      </h3>

      <p>
        ₹
        {
          order.total_amount
        }
      </p>

      <select
        value={
          order.status
        }

        onChange={
          e =>
          updateOrderStatus(
            order.id,
            e.target.value
          )
        }
      >

        <option>
          Placed
        </option>

        <option>
          Packed
        </option>

        <option>
          Shipped
        </option>

        <option>
          Delivered
        </option>

      </select>

    </div>
  ))}

</div>



      </div>



    </div>
  )
}

export default AdminPanelPage