import {
  useEffect,
  useState
} from 'react'

import Navbar
from '../components/Navbar'

import API
from '../services/api'

function OrderTrackingPage() {

  const [orders,
  setOrders] =
  useState([])

  useEffect(() => {
    fetchOrders()
  }, [])

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

  const cancelOrder =
  async (id) => {

    try {

      await API.put(
        `/orders/${id}/cancel`
      )

      alert(
        'Order Cancelled'
      )

      fetchOrders()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>

      <Navbar />

      <div
        style={{
          padding: '40px'
        }}
      >

        <h1>
          Order Tracking
        </h1>

        {orders.length === 0 ? (

          <p>
            No Orders Found
          </p>

        ) : (

          orders.map(
            order => (

            <div
              key={
                order.id
              }

              style={{
                background:
                'white',

                padding:
                '20px',

                marginBottom:
                '20px',

                borderRadius:
                '12px',

                boxShadow:
                '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >

              <h3>
                Order #
                {order.id}
              </h3>

              <p>
                Total:
                ₹
                {
                  order.total_amount
                }
              </p>

              <p>

                Status:

                <span
                  style={{
                    color:
                    order.status ===
                    'Delivered'
                    ? 'green'
                    : order.status ===
                    'Cancelled'
                    ? 'red'
                    : 'orange',

                    fontWeight:
                    'bold',

                    marginLeft:
                    '8px'
                  }}
                >

                  {
                    order.status
                  }

                </span>

              </p>

              {/* ORDER FLOW */}

              {order.status !==
              'Cancelled' && (

                <div
                  style={{
                    display:
                    'flex',

                    alignItems:
                    'center',

                    gap: '10px',

                    marginTop:
                    '15px',

                    flexWrap:
                    'wrap'
                  }}
                >

                  {[
                    'Placed',
                    'Packed',
                    'Shipped',
                    'Delivered'
                  ].map(step => (

                    <div
                      key={step}

                      style={{
                        display:
                        'flex',

                        alignItems:
                        'center'
                      }}
                    >

                      <div
                        style={{
                          padding:
                          '10px 15px',

                          borderRadius:
                          '20px',

                          background:
                          order.status ===
                          step
                          ? '#2563eb'
                          : '#ddd',

                          color:
                          order.status ===
                          step
                          ? 'white'
                          : 'black',

                          fontWeight:
                          'bold'
                        }}
                      >

                        {step}

                      </div>

                      {step !==
                      'Delivered' && (

                        <span
                          style={{
                            margin:
                            '0 8px'
                          }}
                        >
                          →
                        </span>
                      )}

                    </div>
                  ))}

                </div>
              )}

              {(order.status ===
              'Placed' ||

              order.status ===
              'Packed') && (

                <button
                  onClick={() =>
                    cancelOrder(
                      order.id
                    )
                  }

                  style={{
                    marginTop:
                    '20px',

                    background:
                    'red',

                    color:
                    'white',

                    border:
                    'none',

                    padding:
                    '10px 15px',

                    borderRadius:
                    '8px',

                    cursor:
                    'pointer'
                  }}
                >
                  Cancel Order
                </button>
              )}

            </div>
          ))
        )}

      </div>

    </div>
  )
}

export default
OrderTrackingPage