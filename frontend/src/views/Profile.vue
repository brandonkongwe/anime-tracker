<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
    <div class="container mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-center text-gray-800">{{ profile.username }}'s Profile</h1>
      <!-- Top Section: Profile Information and Anime Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Profile Information Card -->
        <div class="bg-white p-8 rounded-xl shadow-lg">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Profile Information</h2>
          <form @submit.prevent="handleUpdateProfile">
            <div class="mb-6">
              <label class="block text-gray-700 font-medium mb-2">Username</label>
              <input
                v-model="profile.username"
                type="text"
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 font-medium mb-2">Email</label>
              <input
                v-model="profile.email"
                type="email"
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="flex justify-between">
              <button
                type="submit"
                class="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Update Profile
              </button>
              <button
                @click="handleDeleteProfile"
                class="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete Profile
              </button>
            </div>
          </form>
        </div>

        <!-- Anime Stats Section -->
        <div class="bg-white p-8 rounded-xl shadow-lg">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Anime Stats</h2>
          <div class="grid grid-cols-2 gap-8">
            <!-- Chart for Anime Stats -->
            <div class="bg-gray-50 p-6 rounded-lg">
              <canvas ref="animeChart" class="w-full h-64"></canvas>
            </div>
            <!-- Stats Summary -->
            <div class="space-y-6">
              <div class="bg-blue-50 p-6 rounded-lg">
                <h3 class="text-lg font-semibold text-blue-800">Total Anime Logged</h3>
                <p class="text-3xl font-bold text-blue-800">{{ animeList.length }}</p>
              </div>
              <div class="bg-purple-50 p-6 rounded-lg">
                <h3 class="text-lg font-semibold text-purple-800">Total Episodes Watched</h3>
                <p class="text-3xl font-bold text-purple-800">{{ totalEpisodes }}</p>
              </div>
              <div class="bg-green-50 p-6 rounded-lg">
                <h3 class="text-lg font-semibold text-green-800">Average Rating</h3>
                <p class="text-3xl font-bold text-green-800">{{ averageRating.toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Anime List Section -->
      <div class="bg-white p-8 rounded-xl shadow-lg">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">My Anime List</h2>
        <div v-if="animeList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="anime in animeList"
            :key="anime.id"
            class="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            <div class="flex items-center">
              <img
                :src="anime.image_url"
                :alt="anime.title"
                class="w-24 h-32 object-cover rounded-lg"
              />
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-800">{{ anime.title }}</h3>
                <p class="text-sm text-gray-600">Status: {{ anime.status }}</p>
                <p class="text-sm text-gray-600">Episodes Watched: {{ anime.episodes_watched }}</p>
                <p class="text-sm text-gray-600">Rating: {{ anime.rating }}</p>
                <p class="text-sm text-gray-600">Notes: {{ anime.notes }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-center text-gray-600">No anime in your list.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Chart from 'chart.js/auto';

const profile = ref({ username: '', email: '' });
const animeList = ref([]);
const router = useRouter();
const animeChart = ref(null);

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
      router.push('/');
    } catch (err) {
      console.error('Failed to delete profile:', err);
      alert('Failed to delete profile. Please try again.');
    }
  }
};

// calculate total episodes watched and average rating
const totalEpisodes = computed(() => {
  return animeList.value.reduce((acc, anime) => acc + anime.episodes_watched, 0);
});

const averageRating = computed(() => {
  const ratings = animeList.value.map((anime) => anime.rating);
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return ratings.length ? sum / ratings.length : 0;
});

// group anime by status
const groupAnimeByStatus = computed(() => {
  const statusGroups = {
    watching: 0,
    completed: 0,
    'on-hold': 0,
    dropped: 0,
    'plan-to-watch': 0,
  };

  animeList.value.forEach((anime) => {
    if (statusGroups.hasOwnProperty(anime.status)) {
      statusGroups[anime.status]++;
    }
  });

  return statusGroups;
});

// stacked bar chart
const renderChart = () => {
  const ctx = animeChart.value.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Anime by Status'],
      datasets: [
        {
          label: 'Watching',
          data: [groupAnimeByStatus.value.watching],
          backgroundColor: '#3b82f6', // Blue
          stack: 'Stack 0',
        },
        {
          label: 'Completed',
          data: [groupAnimeByStatus.value.completed],
          backgroundColor: '#10b981', // Green
          stack: 'Stack 0',
        },
        {
          label: 'On Hold',
          data: [groupAnimeByStatus.value['on-hold']],
          backgroundColor: '#f59e0b', // Orange
          stack: 'Stack 0',
        },
        {
          label: 'Dropped',
          data: [groupAnimeByStatus.value.dropped],
          backgroundColor: '#ef4444', // Red
          stack: 'Stack 0',
        },
        {
          label: 'Plan to Watch',
          data: [groupAnimeByStatus.value['plan-to-watch']],
          backgroundColor: '#8b5cf6', // Purple
          stack: 'Stack 0',
        },
      ],
    },
    options: {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          beginAtZero: true,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.raw || 0;
              return `${label}: ${value}`;
            },
          },
        },
      },
    },
  });
};

// watch for changes in animeList and render chart
watch(animeList, () => {
  if (animeChart.value) {
    renderChart();
  }
});

onMounted(() => {
  fetchProfile();
  fetchAnimeList();
});
</script>

<style scoped>
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, #f0f4ff, #fdf2f8);
}
</style>