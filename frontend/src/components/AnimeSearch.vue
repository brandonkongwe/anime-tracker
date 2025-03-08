<template>
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Search Anime</h2>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for anime..."
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        @input="searchAnime"
      />
  
      <!-- Loading State -->
      <div v-if="isLoading" class="mt-4">Loading...</div>
  
      <!-- Error State -->
      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
  
      <!-- Search Results -->
      <div v-if="animeResults.length > 0" class="mt-4">
        <div
          v-for="anime in animeResults"
          :key="anime.mal_id"
          class="bg-white p-4 rounded shadow-md mb-4"
        >
          <h3 class="text-xl font-bold">{{ anime.title }}</h3>
          <p class="text-gray-600">{{ anime.synopsis }}</p>
          <button
            @click="addAnimeToList(anime)"
            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to List
          </button>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';

const searchQuery = ref('');
const animeResults = ref([]);
const isLoading = ref(false);
const error = ref('');

// Search anime
const searchAnime = async () => {
if (searchQuery.value.length < 3) return; // Minimum search query length

isLoading.value = true;
error.value = '';

try {
    const response = await axios.get('http://localhost:5000/search-anime', {
    params: { query: searchQuery.value, limit: 3 },
    withCredentials: true,
    });
    animeResults.value = response.data.data;
} catch (err) {
    console.error('Error searching anime:', err);
    error.value = 'Failed to search anime. Please try again.';
} finally {
    isLoading.value = false;
}
};

// add anime to the user's list
const addAnimeToList = async (anime) => {
try {
    const response = await axios.post(
    'http://localhost:5000/add-anime',
    {
        anime_id: anime.mal_id,
        title: anime.title,
        status: 'plan-to-watch', 
        episodes_watched: 0,
        rating: 1,
        notes: '',
        image_url: anime.value.images.jpg.image_url,
    },
    { withCredentials: true }
    );

    if (response.status === 201) {
    alert('Anime added to your list!');
    }
} catch (err) {
    console.error('Failed to add anime:', err);
    alert('Failed to add anime. Please try again.');
}
};
</script>