import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Threads from '../views/Threads.vue';
import About from '../views/About.vue';
import Login from '../components/auth/LoginForm.vue';
import Register from '../components/auth/RegisterForm.vue';
import ThreadForm from '../components/threads/ThreadForm.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/threads', component: Threads },
  { path: '/about', component: About },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/create-thread', component: ThreadForm },
  { path: '/edit-thread/:id', component: ThreadForm, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;