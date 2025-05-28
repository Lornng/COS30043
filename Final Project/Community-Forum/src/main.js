import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
// import { seedThreads } from './utils/seedFirestore';

const app = createApp(App);

const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount('#app');
// seedThreads();