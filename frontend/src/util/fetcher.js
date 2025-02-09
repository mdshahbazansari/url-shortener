import axios from 'axios'
const ENV = import.meta.env

axios.defaults.baseURL = ENV.VITE_SERVER

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export default fetcher
