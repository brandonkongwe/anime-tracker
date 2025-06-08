<template>
    <!-- Navigation Bar -->
<nav class="bg-white shadow-sm">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <router-link v-if="authStore.isAuthenticated" to="/anime-list" class="text-2xl font-bold text-indigo-600">
          <font-awesome-icon icon="fas fa-tv" class="text-indigo-600 text-2xl mr-2" />
        </router-link>
        <router-link v-if="!authStore.isAuthenticated" to="/" class="text-2xl font-bold text-indigo-600">
          <font-awesome-icon icon="fas fa-tv" class="text-indigo-600 text-2xl mr-2" />
        </router-link>
        <router-link v-if="authStore.isAuthenticated" to="/anime-list" class="text-2xl font-bold text-indigo-600">AnimeTracker</router-link>
        <router-link v-if="!authStore.isAuthenticated" to="/" class="text-2xl font-bold text-indigo-600">AnimeTracker</router-link>
      </div>
      
      <div class="flex space-x-4">
        <router-link
          v-if="authStore.isAuthenticated"
          to="/anime-list"
          class="text-gray-700 hover:text-blue-600 transition duration-200"
          >Home</router-link
        >

        <router-link
          v-if="!authStore.isAuthenticated"
          to="/register"
          class="text-gray-700 hover:text-blue-600 transition duration-200"
          >Register</router-link
        >

        <router-link
          v-if="!authStore.isAuthenticated"
          to="/login"
          class="text-gray-700 hover:text-blue-600 transition duration-200"
          >Login</router-link
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
  router.push('/');
};
</script>
