import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">

      <h2 className="logo">
        StockSphere
      </h2>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/cart">
          Cart
        </Link>

        <Link to="/orders">
          Orders
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/admin">
          Admin
        </Link>

      </div>
    </nav>
  )
}

export default Navbar