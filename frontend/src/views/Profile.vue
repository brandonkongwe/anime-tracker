<template>
    <div class="min-h-screen bg-gray-100 p-4">
      <div class="container mx-auto">
        <h1 class="text-2xl font-bold mb-4">My Profile</h1>
  
        <!-- Profile Information -->
        <div class="bg-white p-6 rounded shadow-md mb-6 w-xl">
          <h2 class="text-xl font-bold mb-4">Profile Information</h2>
          <form @submit.prevent="handleUpdateProfile">
            <div class="mb-4">
              <label class="block text-gray-700">Username</label>
              <input
                v-model="profile.username"
                type="text"
                class="w-50% px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Email</label>
              <input
                v-model="profile.email"
                type="email"
                class="w-50% px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 mr-10 rounded hover:bg-blue-600"
            >
              Update Profile
            </button>
            <button
                @click="handleDeleteProfile"
                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
            Delete Profile
          </button>
          </form>
        </div>
  
        <!-- Anime List -->
        <div class="bg-white p-6 rounded shadow-md">
          <h2 class="text-xl font-bold mb-4">My Anime List</h2>
          <div v-if="animeList.length > 0" class="grid grid-cols-3 gap-8">
            <div
              v-for="anime in animeList"
              :key="anime.id"
              class="bg-gray-50 p-4 rounded mb-4"
            >
              <div class="flex items-center">
                <img
                  :src="anime.image_url"
                  :alt="anime.title"
                  class="w-16 h-24 object-cover rounded"
                />
                <div class="ml-4">
                  <h3 class="text-lg font-bold">{{ anime.title }}</h3>
                  <p>Status: {{ anime.status }}</p>
                  <p>Episodes Watched: {{ anime.episodes_watched }}</p>
                  <p>Rating: {{ anime.rating }}</p>
                  <p>Notes: {{ anime.notes }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>No anime in your list.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const profile = ref({ username: '', email: '' });
  const animeList = ref([]);
  const router = useRouter();
  
  // Fetch profile and anime list
  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/profile', {
        withCredentials: true,
      });
      profile.value = response.data;
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };
  
  const fetchAnimeList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/anime-list', {
        withCredentials: true,
      });
      animeList.value = response.data;
    } catch (err) {
      console.error('Failed to fetch anime list:', err);
    }
  };
  
  // Update profile
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        'http://localhost:5000/profile',
        profile.value,
        { withCredentials: true }
      );
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };
  
  // Delete profile
  const handleDeleteProfile = async () => {
    if (confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        const response = await axios.delete('http://localhost:5000/profile', {
          withCredentials: true,
        });
        alert('Profile deleted successfully!');
        router.push('/login');
      } catch (err) {
        console.error('Failed to delete profile:', err);
        alert('Failed to delete profile. Please try again.');
      }
    }
  };
  
  onMounted(() => {
    fetchProfile();
    fetchAnimeList();
  });
</script>