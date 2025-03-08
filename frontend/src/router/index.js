import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import AddAnime from '../views/AddAnime.vue';
import AnimeSearch from '@/components/AnimeSearch.vue';

const routes = [
  { path: '/anime-list', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/add-anime', component: AddAnime },
  { path: '/search', component: AnimeSearch },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;