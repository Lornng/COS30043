<template>
  <div class="container mt-5">
    <!-- Hero Section -->
    <div class="row align-items-center mb-5">
      <div class="col-lg-6">
        <h1 class="display-4 fw-bold mb-3">Welcome to ForumHub</h1>
        <p class="lead mb-4">
          Join our vibrant community where tech enthusiasts, sustainability advocates, 
          and gaming fans come together to share knowledge, ask questions, and 
          collaborate on innovative ideas. Whether you're a beginner or an expert, 
          you'll find valuable discussions and friendly support here.
        </p>
        <router-link to="/threads" class="btn btn-primary btn-lg me-2">
          Explore Threads
        </router-link>
        <router-link v-if="!auth.user" to="/register" class="btn btn-outline-primary btn-lg">
          Join Community
        </router-link>
      </div>
      <div class="col-lg-6 text-center">
        <img 
          src="../../public/img/forum-image2.jpg" 
          alt="Community Discussion" 
          class="img-fluid rounded shadow"
          style="max-height: 400px;"
        >
      </div>
    </div>

    <!-- Features Section -->
    <div class="row mt-5 py-5 border-top">
      <div class="col-md-4 mb-4">
        <div class="card h-100 border-0 shadow-sm">
          <img 
            src="../../public/img/forum-image1.jpg" 
            class="card-img-top" 
            alt="Tech Discussions"
            style="height: 200px; object-fit: cover;"
          >
          <div class="card-body">
            <h3 class="card-title">Tech Insights</h3>
            <p class="card-text">
              Dive into the latest web development trends, Vue.js tips, and 
              system architecture discussions. Learn from industry experts and 
              share your own experiences.
            </p>
          </div>
        </div>
      </div>
      
      <div class="col-md-4 mb-4">
        <div class="card h-100 border-0 shadow-sm">
          <img 
            src="../../public/img/sustainable.jpg" 
            class="card-img-top" 
            alt="Sustainability"
            style="height: 200px; object-fit: cover;"
          >
          <div class="card-body">
            <h3 class="card-title">Sustainable Future</h3>
            <p class="card-text">
              Explore eco-friendly technologies, sustainable living practices, 
              and green innovations. Join our mission to create a better 
              tomorrow through actionable discussions.
            </p>
          </div>
        </div>
      </div>
      
      <div class="col-md-4 mb-4">
        <div class="card h-100 border-0 shadow-sm">
          <img 
            src="../../public/img/gaming.jpg" 
            class="card-img-top" 
            alt="Gaming Community"
            style="height: 200px; object-fit: cover;"
          >
          <div class="card-body">
            <h3 class="card-title">Gaming Hub</h3>
            <p class="card-text">
              Discuss the latest game releases, share strategies, and connect 
              with fellow gamers. From indie gems to AAA titles, we've got you 
              covered.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="row mt-5 py-4 bg-light rounded-3 text-center">
      <div class="col-md-4">
        <h2 class="display-3 fw-bold text-primary">1,200+</h2>
        <p class="fs-5">Active Threads</p>
      </div>
      <div class="col-md-4">
        <h2 class="display-3 fw-bold text-primary">850+</h2>
        <p class="fs-5">Community Members</p>
      </div>
      <div class="col-md-4">
        <h2 class="display-3 fw-bold text-primary">24/7</h2>
        <p class="fs-5">Real-time Discussions</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
const auth = useAuthStore();
</script>

<style scoped>
.card {
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-10px);
}
</style>