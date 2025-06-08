<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">My Anime List</h1>
      <div v-if="animeList.length > 0" class="grid grid-cols-3 gap-8">
        <div
          v-for="anime in animeList"
          :key="anime.id"
          class="bg-white p-4 rounded shadow-md mb-4 overflow-hidden"
        >
          <div class="flex items-center">
            <!-- Anime Image -->
            <img
              :src="anime.image_url"
              :alt="anime.title"
              class="w-30 h-40 object-cover rounded"
            />
            <div class="ml-4">
              <h2 class="text-xl font-bold">{{ anime.title }}</h2>
              <p>Status: {{ anime.status }}</p>
              <p>Episodes Watched: {{ anime.episodes_watched }}</p>
              <p>Rating: {{ anime.rating }}</p>
              <p>Notes: {{ anime.notes }}</p>
            </div>
          </div>
          <div class="mt-2">
            <button
              @click="openEditModal(anime)"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
            >
              Edit
            </button>
            <button
              @click="handleDeleteAnime(anime.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No anime in your list.</p>
        <br />
        <router-link to="/add-anime" class="bg-white hover:bg-gray-100 text-indigo-600 px-8 py-3 rounded-md text-lg font-medium transition duration-200">Add Here</router-link>
      </div>
    </div>

    <!-- Edit Modal -->
    <EditAnime
      v-if="isEditModalOpen"
      :anime="selectedAnime"
      @close="isEditModalOpen = false"
      @updated="fetchAnimeList"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import EditAnime from '@/components/EditAnime.vue';

const animeList = ref([]);
const isEditModalOpen = ref(false);
const selectedAnime = ref(null);

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

const openEditModal = (anime) => {
  selectedAnime.value = anime;
  isEditModalOpen.value = true;
};

const handleDeleteAnime = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/anime-list/${id}`, {
      withCredentials: true,
    });
    animeList.value = animeList.value.filter((anime) => anime.id !== id);
  } catch (err) {
    console.error('Failed to delete anime:', err);
  }
};

onMounted(() => {
  fetchAnimeList();
});
</script>