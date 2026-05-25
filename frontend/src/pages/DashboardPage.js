import {
  useEffect,
  useState
} from 'react'

import API from '../services/api'
import Navbar from '../components/Navbar'

import './DashboardPage.css'

function DashboardPage() {

  const [dashboard,
  setDashboard] =
  useState(null)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard =
  async () => {

    try {

      const response =
      await API.get(
        '/dashboard'
      )

      setDashboard(
        response.data
      )

    } catch (error) {
      console.log(error)
    }
  }

  if (!dashboard) {
    return <h1>Loading...</h1>
  }

  return (
    <div>

      <Navbar />

      <div className="dashboard">

        <h1>
          Dashboard Analytics
        </h1>

        <div className="dashboard-grid">

          <div className="card">
            <h2>
              Total Orders
            </h2>

            <p>
              {
                dashboard.totalOrders
              }
            </p>
          </div>

          <div className="card">
            <h2>
              Revenue
            </h2>

            <p>
              ₹{
                dashboard.totalRevenue
              }
            </p>
          </div>

          <div className="card">
            <h2>
              Products
            </h2>

            <p>
              {
                dashboard.totalProducts
              }
            </p>
          </div>

          <div className="card">
            <h2>
              Low Stock
            </h2>

            <p>
              {
                dashboard
                .lowStockProducts
                .length
              }
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default DashboardPage
