import { defineStore } from 'pinia'
import axios from '@/services/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: JSON.parse(localStorage.getItem('token')) || null,
  }),
  actions: {
    async login(userData) {
      this.user = userData
      this.token = userData.token // Store token as well
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', JSON.stringify(userData.token))
    },

    async register(formData) {
      try {
        const response = await axios.post('/register', formData)
        this.user = response.data.user
        this.token = response.data.token
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('token', JSON.stringify(this.token))
      } catch (error) {
        console.error('Registration failed:', error)
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token
  }
})
