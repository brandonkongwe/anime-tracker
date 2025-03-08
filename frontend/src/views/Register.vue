<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-96">
        <h2 class="text-2xl font-bold mb-6">Register</h2>
        <form @submit.prevent="handleRegister">
          <!-- Username Field -->
          <div class="mb-4">
            <label class="block text-gray-700">Username</label>
            <input
              v-model="username"
              type="text"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
  
          <!-- Email Field -->
          <div class="mb-4">
            <label class="block text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
  
          <!-- Password Field -->
          <div class="mb-6">
            <label class="block text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
  
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
  
          <!-- Login Link -->
          <p class="mt-4 text-center text-gray-600">
            Already have an account?
            <router-link to="/login" class="text-blue-500 hover:underline">Login here</router-link>
          </p>
        </form>
  
        <!-- Error Message -->
        <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {{ error }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const error = ref('');
  const router = useRouter();
  
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username: username.value,
        email: email.value,
        password: password.value,
      });
  
      if (response.status === 201) {
        router.push('/login');
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed. Please try again.';
    }
  };
  </script>
