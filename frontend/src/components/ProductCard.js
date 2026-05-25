import { Link } from 'react-router-dom'
import './ProductCard.css'

function ProductCard({ product }) {

  return (
    <div className="product-card">

      <img
        src={
          product.image ||
          'https://via.placeholder.com/250'
        }
        alt={product.name}
      />

      <h3>
        {product.name}
      </h3>

      <p>
        ₹{product.price}
      </p>

      <p>
        Stock:
        {product.stock}
      </p>

      <Link
        to={`/product/${product.id}`}
      >
        <button>
          View Product
        </button>
      </Link>

    </div>
  )
}

export default ProductCard