<template>
  <div class="bg-gray-100 flex flex-col min-h-screen">
    <Navbar />
    <router-view class="container mx-auto flex-grow"></router-view>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.checkAuthStatus();
});
</script>
