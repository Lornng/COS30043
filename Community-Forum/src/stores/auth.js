// this file is use to authenticate the user entry
// pinia store is an official state management library for Vue.js

import { defineStore } from 'pinia';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  // State
  state: () => ({
    user: null, // Define the user as null when first create the pinia store
  }),
  
  // Actions (methods to modify state)
  actions: {
    setUser(user) {
      this.user = user; // Update user state
    },

    init() {
      // Listen for auth state changes
      onAuthStateChanged(auth, (user) => {
        this.user = user;
        console.log('Auth state changed:', user?.email || 'Logged out');
      });
    },

    async logout() {
      await auth.signOut(); // Firebase logout
      this.user = null; // Reset state
    },
  },
});