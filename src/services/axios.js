import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// Create the Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  withCredentials: true, // Optional: use if you want to send cookies
})

// Optional: Add auth token from Pinia store before every request
api.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

// Optional: Handle global errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout() // Or redirect to login page
    } else if (error.response?.status === 500) {
      alert('Something went wrong on the server. Please try again later.')
    }
    return Promise.reject(error)
  }
)

export default api
