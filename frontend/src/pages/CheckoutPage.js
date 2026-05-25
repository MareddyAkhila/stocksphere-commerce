import {
  useEffect,
  useState
} from 'react'



import API
from '../services/api'

import Navbar
from '../components/Navbar'

import jsPDF
from 'jspdf'

function CheckoutPage() {

  const [cart,
  setCart] =
  useState([])

  const [coupon,
  setCoupon] =
  useState('')

  const [discount,
  setDiscount] =
  useState(0)

  const [orderPlaced,
setOrderPlaced] =
useState(false)


  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart =
  async () => {

    try {

      const response =
      await API.get(
        '/cart/1'
      )

      setCart(
        response.data
      )

    } catch (error) {
      console.log(error)
    }
  }

  const applyCoupon =
  () => {

    if (
      coupon ===
      'SAVE10'
    ) {

      setDiscount(10)

      alert(
        '10% Discount Applied'
      )

    } else if (
      coupon ===
      'WELCOME20'
    ) {

      setDiscount(20)

      alert(
        '20% Discount Applied'
      )

    } else {

      setDiscount(0)

      alert(
        'Invalid Coupon'
      )
    }
  }

  const downloadInvoice =
() => {

  const pdf =
  new jsPDF()

  pdf.setFontSize(20)

  pdf.text(
    'StockSphere Commerce',
    20,
    20
  )

  pdf.setFontSize(14)

  pdf.text(
    'Order Invoice',
    20,
    35
  )

  pdf.text(
    `Date:
    ${new Date()
    .toLocaleDateString()}`,
    20,
    50
  )

  let y = 70

  pdf.text(
    'Products:',
    20,
    y
  )

  y += 10

  cart.forEach(
    item => {

    pdf.text(
      `${item.name}
      x ${item.quantity}
      - ₹${
      item.price *
      item.quantity
      }`,
      20,
      y
    )

    y += 10
  })

  pdf.text(
    `Total:
    ₹${finalTotal}`,
    20,
    y + 10
  )

  pdf.save(
    'invoice.pdf'
  )
}

  const placeOrder =
  async () => {

    try {

      const items =
      cart.map(item => ({
        product_id:
        item.product_id ||
        item.id,

        quantity:
        item.quantity
      }))

      await API.post(
        '/orders',
        {
          user_id: 1,
          items
        }
      )

      alert(
       'Order Placed Successfully'
      )

      setOrderPlaced(
          true
     )

    } catch (error) {

      alert(
        'Order Failed'
      )

      console.log(error)
    }
  }

  const total =
  cart.reduce(
    (sum, item) =>
      sum +
      item.price *
      item.quantity,
    0
  )

  const finalTotal =
  total -
  (
    total *
    discount / 100
  )

  return (
    <div>

      <Navbar />

      <div
        style={{
          padding:
          '40px'
        }}
      >

        <h1>
          Checkout
        </h1>

        <h2>
          Original Total:
          ₹{total}
        </h2>

        <div
          style={{
            marginTop:
            '20px'
          }}
        >

          <input
            type="text"
            placeholder=
            "Enter Coupon"

            value={
              coupon
            }

            onChange={
              e =>
              setCoupon(
                e.target
                .value
              )
            }

            style={{
              padding:
              '10px',

              marginRight:
              '10px'
            }}
          />

          <button
            onClick={
              applyCoupon
            }
          >
            Apply Coupon
          </button>

        </div>

        <h2
          style={{
            marginTop:
            '20px',

            color:
            'green'
          }}
        >

          Final Total:
          ₹{
            finalTotal
          }

        </h2>

        

        <button
          onClick={
            placeOrder
          }

          style={{
            marginTop:
            '20px',

            padding:
            '14px 22px',

            background:
            '#2563eb',

            border:
            'none',

            color:
            'white',

            borderRadius:
            '6px'
          }}
        >
          Place Order
        </button>

        {orderPlaced && (

  <button
    onClick={
      downloadInvoice
    }

    style={{
      marginTop:
      '20px',

      marginLeft:
      '10px',

      padding:
      '14px 22px',

      background:
      'green',

      border:
      'none',

      color:
      'white',

      borderRadius:
      '6px'
    }}
  >

    Download Invoice PDF

  </button>
)}

      </div>

    </div>
  )
}

export default CheckoutPage