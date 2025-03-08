<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-96">
        <h2 class="text-2xl font-bold mb-6">Add Anime</h2>
        <form @submit.prevent="handleAddAnime">
          <!-- Anime Title -->
          <div class="mb-4">
            <label class="block text-gray-700">Title</label>
            <input
              v-model="title"
              type="text"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
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
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const title = ref('');
  const status = ref('watching');
  const episodes_watched = ref(0);
  const rating = ref(1);
  const notes = ref('');
  const router = useRouter();
  
  const handleAddAnime = async () => {
  try {
    const response = await axios.post(
      'http://localhost:5000/add-anime',
      {
        anime_id: Date.now(),
        title: title.value,
        status: status.value,
        episodes_watched: episodes_watched.value,
        rating: rating.value,
        notes: notes.value,
      },
      { withCredentials: true } // session cookie
    );

    if (response.status === 201) {
      router.push('/anime-list');
    }
  } catch (err) {
    console.error('Failed to add anime:', err);
    if (err.response?.status === 401) {
      alert('You must be logged in to add anime.');
      router.push('/login');
    }
  }
};
  </script>