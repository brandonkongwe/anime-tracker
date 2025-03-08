<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6">Add Anime</h2>

      <!-- Search Input -->
      <div class="mb-4">
        <label class="block text-gray-700">Search Anime</label>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for anime..."
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          @input="searchAnime"
        />
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="mb-4">Loading...</div>

      <!-- Error State -->
      <div v-if="error" class="mb-4 text-red-500">{{ error }}</div>

      <!-- Search Results -->
      <div v-if="animeResults.length > 0" class="mb-4">
        <div
          v-for="anime in animeResults"
          :key="anime.mal_id"
          class="bg-gray-50 p-3 rounded mb-2 cursor-pointer hover:bg-gray-100"
          @click="selectAnime(anime)"
        >
          <div class="flex items-center">
            <!-- Anime Image -->
            <img
              :src="anime.images.jpg.image_url"
              :alt="anime.title"
              class="w-16 h-24 object-cover rounded"
            />
            <div class="ml-4">
              <h3 class="font-bold">{{ anime.title }}</h3>
              <p class="text-sm text-gray-600">{{ anime.synopsis }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Selected Anime Form -->
      <div v-if="selectedAnime" class="mb-4">
        <div class="flex items-center mb-4">
          <!-- Selected Anime Image -->
          <img
            :src="selectedAnime.images.jpg.image_url"
            :alt="selectedAnime.title"
            class="w-16 h-24 object-cover rounded"
          />
          <h3 class="text-lg font-bold ml-4">{{ selectedAnime.title }}</h3>
        </div>
        <form @submit.prevent="handleAddAnime">
          <!-- Status -->
          <div class="mb-4">
            <label class="block text-gray-700">Status</label>
            <select
              v-model="status"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="watching">Watching</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
              <option value="dropped">Dropped</option>
              <option value="plan-to-watch">Plan to Watch</option>
            </select>
          </div>

          <!-- Episodes Watched -->
          <div class="mb-4">
            <label class="block text-gray-700">Episodes Watched</label>
            <input
              v-model="episodes_watched"
              type="number"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <!-- Rating -->
          <div class="mb-4">
            <label class="block text-gray-700">Rating</label>
            <input
              v-model="rating"
              type="number"
              min="1"
              max="10"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <!-- Notes -->
          <div class="mb-4">
            <label class="block text-gray-700">Notes</label>
            <textarea
              v-model="notes"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Anime
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const animeResults = ref([]);
const selectedAnime = ref(null);
const isLoading = ref(false);
const error = ref('');

const status = ref('watching');
const episodes_watched = ref(0);
const rating = ref(1);
const notes = ref('');

const router = useRouter();

// Search anime
const searchAnime = async () => {
  if (searchQuery.value.length < 3) return; // Minimum search query length

  isLoading.value = true;
  error.value = '';

  try {
    const response = await axios.get('http://localhost:5000/search-anime', {
      params: { query: searchQuery.value, limit: 10 },
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

// Select anime from search results
const selectAnime = (anime) => {
  selectedAnime.value = anime;
  animeResults.value = []; // Clear search results
};

// Add anime to user's list
const handleAddAnime = async () => {
  try {
    const response = await axios.post(
      'http://localhost:5000/add-anime',
      {
        anime_id: selectedAnime.value.mal_id,
        title: selectedAnime.value.title,
        status: status.value,
        episodes_watched: episodes_watched.value,
        rating: rating.value,
        notes: notes.value,
        image_url: selectedAnime.value.images.jpg.image_url, // Add image URL
      },
      { withCredentials: true }
    );

    if (response.status === 201) {
      alert('Anime added to your list!');
      router.push('/anime-list');
    }
  } catch (err) {
    console.error('Failed to add anime:', err);
    alert('Failed to add anime. Please try again.');
  }
};
</script>