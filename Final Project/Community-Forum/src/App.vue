<template>
  <!-- Navigation Bar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container">
      <router-link to="/" class="navbar-brand">Community Forum</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/threads" class="nav-link">Threads</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
        </ul>

        <!-- Right Side: Auth State -->
        <ul class="navbar-nav ms-auto">
          <template v-if="auth.user">
            <li class="nav-item d-flex align-items-center me-2">
              <span class="text-muted small">Welcome, {{ auth.user.email }}</span>
            </li>
            <li class="nav-item">
              <button @click="logout" class="btn btn-outline-danger btn-sm">
                Logout
              </button>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Router View -->
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const logout = async () => {
  await auth.logout();
  router.push('/login');
};

onMounted(() => {
  // Ensure this is defined in your auth.js store
  auth.init?.(); 
});
</script>
