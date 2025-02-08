import axios from 'axios'

const ENV = import.meta.env

const http = axios.create({
  baseURL: ENV.VITE_SERVER,
})

export default http
