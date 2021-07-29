import axios from 'axios'

const api = axios.create({
  baseURL: 'https://randomuser.me/api',
})

export default api
