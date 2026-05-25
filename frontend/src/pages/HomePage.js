import {
  useEffect,
  useState
} from 'react'

import API from '../services/api'

import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

import './HomePage.css'

function HomePage() {

  const [products,
  setProducts] =
  useState([])

  const [search,
  setSearch] =
  useState('')

  const [category,
  setCategory] =
  useState('')

  const [availability,
  setAvailability] =
  useState('')

  const [priceRange,
  setPriceRange] =
  useState('')

  useEffect(() => {
    fetchProducts()
  }, [
    search,
    category,
    availability,
    priceRange
  ])

  const fetchProducts =
  async () => {

    try {

      let url =
      '/products?'

      if (search) {
        url +=
        `search=${search}&`
      }

      if (category) {
        url +=
        `category=${category}&`
      }

      if (
        priceRange ===
        'low'
      ) {
        url +=
        'maxPrice=1000&'
      }

      if (
        priceRange ===
        'medium'
      ) {
        url +=
        'minPrice=1000&maxPrice=3000&'
      }

      if (
        priceRange ===
        'high'
      ) {
        url +=
        'minPrice=3000&'
      }

      const response =
      await API.get(url)

      let filtered =
      response.data

      if (
        availability ===
        'available'
      ) {

        filtered =
        filtered.filter(
          product =>
          product.stock > 0
        )
      }

      if (
        availability ===
        'unavailable'
      ) {

        filtered =
        filtered.filter(
          product =>
          product.stock === 0
        )
      }

      setProducts(
        filtered
      )

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>

      <Navbar />

      <div
        className=
        "home-container"
      >

        <h1>
          Explore Products
        </h1>

        <div
          className=
          "filters"
        >

          <input
            type="text"
            placeholder=
            "Search Product..."
            value={search}
            onChange={
              e =>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            value={
              category
            }
            onChange={
              e =>
              setCategory(
                e.target.value
              )
            }
          >
            <option value="">
              All Categories
            </option>

            <option>
              Electronics
            </option>

            <option>
              Fashion
            </option>

            <option>
              Furniture
            </option>
          </select>

          <select
            value={
              priceRange
            }
            onChange={
              e =>
              setPriceRange(
                e.target.value
              )
            }
          >

            <option value="">
              Price Range
            </option>

            <option value="low">
              Below ₹1000
            </option>

            <option value="medium">
              ₹1000 - ₹3000
            </option>

            <option value="high">
              Above ₹3000
            </option>

          </select>

          <select
            value={
              availability
            }
            onChange={
              e =>
              setAvailability(
                e.target.value
              )
            }
          >

            <option value="">
              Availability
            </option>

            <option value=
            "available">
              In Stock
            </option>

            <option value=
            "unavailable">
              Out of Stock
            </option>

          </select>

        </div>

        <div
          className=
          "product-grid"
        >

          {products.map(
            product => (

            <ProductCard
              key={
                product.id
              }
              product={
                product
              }
            />
          ))}

        </div>

      </div>

      <Footer />

    </div>
  )
}

export default HomePage