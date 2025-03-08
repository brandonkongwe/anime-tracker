<template>
    <!-- Navigation Bar -->
<nav class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <router-link to="/anime-list" class="text-2xl font-bold text-blue-600">AnimeTracker</router-link>
      <div class="flex space-x-4">
        <router-link
          to="/anime-list"
          class="text-gray-700 hover:text-blue-600 transition duration-200"
          >Home</router-link
        >
        <router-link
          v-if="!authStore.isAuthenticated"
          to="/login"
          class="text-gray-700 hover:text-blue-600 transition duration-200"
          >Login</router-link
        >
        <router-link
          v-if="!authStore.isAuthenticated"
          to="/register"
          class="text-gray-700 hover:text-blue-600 transition duration-200"
          >Register</router-link
        >
        <router-link
          v-if="authStore.isAuthenticated"
          to="/add-anime"
          class="text-gray-700 hover:text-blue-600 transition duration-200"
          >Add</router-link
        >
        <router-link
            v-if="authStore.isAuthenticated"
            to="/search"
            class="text-gray-700 hover:text-blue-600 transition duration-200"
            >
            Search Anime
        </router-link>
        <router-link
            v-if="authStore.isAuthenticated"
            to="/profile"
            class="text-gray-700 hover:text-blue-600 transition duration-200"
            >
            Profile
        </router-link>
        <button
          v-if="authStore.isAuthenticated"
          @click="handleLogout"
          class="text-gray-700 hover:text-blue-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

// Handle logout
const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>
