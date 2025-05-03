
import { defineStore } from 'pinia';
import api from '../services/api';
import TokenService from '../services/token.service';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    loginItems: {
        username: '',
        password: ''
    }
  }),

  actions: {
    async login(loginItems) {
      try {
        const response = await api.post('login', {
          email: loginItems.username,
          password: loginItems.password,
        });
        console.log("Trying to authenticate ", loginItems.username);
        const token = response.data.token;
        TokenService.setToken(token);
        this.user = TokenService.userInfo();
        this.isAuthenticated = true;

        console.log('Login successful');
      } catch (error) {
        console.error('Login failed', error);
      }
    },

    async register(formData) {
      try {
        const response = await api.post('register', formData);
        console.log('Registration successful:', response.data);

        // Optionally auto-login after registration:
        const token = response.data.token;
        TokenService.setToken(token);
        this.user = TokenService.userInfo();
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Registration failed:', error);
      }
    },

    logout() {
      TokenService.removeToken();
      this.isAuthenticated = false;
      this.user = null;
    },
  }

});
