import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import API from '../services/api'
import Navbar from '../components/Navbar'

import './CartPage.css'

function CartPage() {

  const [cart, setCart] =
  useState([])

  useEffect(() => {
    fetchCart()
  }, [])

  const navigate = useNavigate()

  const fetchCart = async () => {

    try {

      const response =
      await API.get('/cart/1')

      setCart(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  const removeItem =
  async (id) => {

    try {

      await API.delete(
        `/cart/${id}`
      )

      fetchCart()

    } catch (error) {
      console.log(error)
    }
  }

  const totalPrice =
  cart.reduce((total, item) =>
    total +
    item.price * item.quantity
  , 0)

  return (
    <div>

      <Navbar />

      <div className="cart-container">

        <h1>
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div
            style={{
                textAlign:
                'center',
                marginTop:
                '40px'
            }}
            >
            <h2>
                Your Cart is Empty
            </h2>

            <p>
                Add products to continue
                shopping
            </p>
            </div>
        ) : (

          cart.map(item => (

            <div
              key={item.id}
              className="cart-item"
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div>

                <h3>
                  {item.name}
                </h3>

                <p>
                  ₹{item.price}
                </p>

                <p>
                  Qty:
                  {item.quantity}
                </p>

              </div>

              <button
                onClick={() =>
                  removeItem(item.id)
                }
              >
                Remove
              </button>

            </div>
          ))
        )}

        <h2>
          Total: ₹{totalPrice}
        </h2>

        <button
            className="checkout-btn"
            onClick={() =>
                navigate('/checkout')
            }
            >
            Proceed To Checkout
        </button>   

      </div>

    </div>
  )
}

export default CartPage