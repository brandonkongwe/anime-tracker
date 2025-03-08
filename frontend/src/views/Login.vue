<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-96">
        <h2 class="text-2xl font-bold mb-6">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-gray-700">Username</label>
            <input v-model="username" type="text" class="w-full px-3 py-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Password</label>
            <input v-model="password" type="password" class="w-full px-3 py-2 border rounded" required />
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '../stores/auth';
  import { useRouter } from 'vue-router';
  
  const username = ref('');
  const password = ref('');
  const authStore = useAuthStore();
  const router = useRouter();
  
  const handleLogin = async () => {
    await authStore.login({ username: username.value, password: password.value });
    router.push('/anime-list');
  };
  </script>