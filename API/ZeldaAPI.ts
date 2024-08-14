import axios from 'axios'

const getZeldaData = axios.create({
  baseURL: 'https://zelda.fanapis.com/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export { getZeldaData }