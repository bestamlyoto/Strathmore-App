// src/stores/auth.js
import { defineStore } from 'pinia'
import axios from '@/services/axios' // Ensure this path points to your axios instance

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null
  }),
  actions: {
    async login(userData) {
      this.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
    },

    async register(formData) {
      try {
        const response = await axios.post('/register', formData)
        this.user = response.data.user
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (error) {
        console.error('Registration failed:', error)
        throw error
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user
  }
})
