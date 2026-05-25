import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import API from '../services/api'
import Navbar from '../components/Navbar'

import './ProductDetailsPage.css'

function ProductDetailsPage() {

  const { id } = useParams()

  const [product, setProduct] =
  useState(null)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {

    try {

      const response =
      await API.get(`/products/${id}`)

      setProduct(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  const addToCart = async () => {

    try {

      await API.post('/cart', {
        user_id: 1,
        product_id: product.id,
        quantity: 1
      })

      alert(
        'Product Added To Cart'
      )

    } catch (error) {
      console.log(error)
    }
  }

  if (!product) {
    return <h1>Loading...</h1>
  }

  return (
    <div>

      <Navbar />

      <div className="details-container">

        <img
          src={
            product.image ||
            'https://via.placeholder.com/500'
          }
          alt={product.name}
        />

        <div className="details-info">

          <h1>
            {product.name}
          </h1>

          <p>
            {product.description}
          </p>

          <h2>
            ₹{product.price}
          </h2>

          <p>
            Stock:
            {product.stock}
          </p>

          <button
            onClick={addToCart}
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  )
}

export default ProductDetailsPage