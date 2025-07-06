import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),
  actions: {
    login(user) {
      this.user = user
      this.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout() {
      this.user = null
      this.isLoggedIn = false
      localStorage.removeItem('user')
    },
    loadUserFromStorage() {
      const saved = localStorage.getItem('user')
      if (saved) {
        this.user = JSON.parse(saved)
        this.isLoggedIn = true
      }
    }
  }
})
