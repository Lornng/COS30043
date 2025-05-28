<template>
  <div class="container mt-4">
    <div class="row">
      <!-- About Content -->
      <div class="col-lg-6 mb-4">
        <h1 class="mb-4">About ForumHub</h1>
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body">
            <p class="card-text">
              ForumHub is a community-driven platform created to foster meaningful 
              discussions across technology, sustainability, and gaming. Our mission 
              is to create an inclusive space where:
            </p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                Knowledge sharing is encouraged and rewarded
              </li>
              <li class="list-group-item border-0">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                Diverse perspectives are welcomed and respected
              </li>
              <li class="list-group-item border-0">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                Members feel safe to ask questions and seek help
              </li>
              <li class="list-group-item border-0">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                Real-world solutions emerge from collaborative efforts
              </li>
            </ul>
            <p class="card-text mt-3">
              Built with Vue.js 3 and Firebase, ForumHub demonstrates modern web 
              development practices while prioritizing user experience and 
              accessibility.
            </p>
          </div>
        </div>

        <!-- Welcome Section -->
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <h3 class="card-title mb-3">Personalize Your Experience</h3>
            
            <div class="row g-3 mb-4">
              <div class="col-md-6">
                <input 
                  v-model="firstName" 
                  type="text" 
                  class="form-control" 
                  placeholder="First Name"
                >
              </div>
              <div class="col-md-6">
                <input 
                  v-model="lastName" 
                  type="text" 
                  class="form-control" 
                  placeholder="Last Name"
                >
              </div>
            </div>
            
            <div v-if="fullName" class="alert alert-info mb-4">
              <i class="bi bi-emoji-smile me-2"></i>
              Welcome, {{ fullName }}! We're glad to have you here.
            </div>
            
            <h5 class="mb-3">Select Your Community Theme:</h5>
            <div class="d-flex gap-3 mb-4">
              <div class="form-check">
                <input 
                  v-model="selectedTheme" 
                  value="tech" 
                  type="radio" 
                  class="form-check-input"
                  id="techTheme"
                >
                <label class="form-check-label" for="techTheme">
                  <i class="bi bi-code-slash me-1"></i> Tech
                </label>
              </div>
              <div class="form-check">
                <input 
                  v-model="selectedTheme" 
                  value="nature" 
                  type="radio" 
                  class="form-check-input"
                  id="natureTheme"
                >
                <label class="form-check-label" for="natureTheme">
                  <i class="bi bi-tree me-1"></i> Nature
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Theme Image Display -->
      <div class="col-lg-6">
        <div class="sticky-top" style="top: 20px;">
          <div class="card border-0 shadow-sm">
            <img 
              :src="selectedTheme === 'tech' 
                ? '../../public/img/tech.jpg' 
                : '../../public/img/nature.jpg'" 
              class="card-img-top" 
              alt="Theme Visualization"
              style="height: 500px; object-fit: cover;"
            >
            <div class="card-body text-center">
              <h5 class="card-title">
                {{ selectedTheme === 'tech' 
                  ? "Technology Innovation Hub" 
                  : "Sustainable Future Initiative" }}
              </h5>
              <p class="card-text">
                {{ selectedTheme === 'tech' 
                  ? "Where cutting-edge ideas transform into digital realities" 
                  : "Building greener solutions through community collaboration" }}
              </p>
            </div>
          </div>
          
          <div class="mt-4 card border-0 shadow-sm">
            <div class="card-body">
              <h5 class="card-title mb-3">Join Our Mission</h5>
              <p>
                Help us build a better discussion platform. Share your ideas, 
                report issues, or contribute to our open-source project.
              </p>
              <button class="btn w-100">
                <a 
                  href="https://github.com/"
                  class="btn btn-outline-primary w-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-github me-2"></i> Contribute on GitHub
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const firstName = ref('');
const lastName = ref('');
const selectedTheme = ref('tech');

const fullName = computed(() => {
  if (!firstName.value && !lastName.value) return '';
  return `${firstName.value} ${lastName.value}`.trim();
});
</script>

<style scoped>
.sticky-top {
  position: sticky;
  z-index: 100;
}
.card {
  border-radius: 0.7rem;
  overflow: hidden;
}
</style>