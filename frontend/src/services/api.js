import axios from 'axios'

const API = axios.create({
  baseURL: 'https://stocksphere-backend-qsk9.onrender.com/api'
})

export default API