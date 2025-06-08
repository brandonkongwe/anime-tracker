import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  actions: {
    async login(credentials) {
      const response = await axios.post('http://localhost:5000/login', credentials);
      this.user = response.data.user;
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
    },
    async logout() {
      try {
        await axios.post('http://localhost:5000/logout');
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('isAuthenticated');
      }
    },
    async checkAuthStatus() {
      try {
        const response = await axios.get('http://localhost:5000/anime-list');
        this.user = response.data;
        this.isAuthenticated = true;
      } catch (error) {
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('isAuthenticated');
      }
    }
  },
  persist: true,
});