<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Edit Anime</h2>
        <form @submit.prevent="handleSave">
          <!-- Status -->
          <div class="mb-4">
            <label class="block text-gray-700">Status</label>
            <select
              v-model="form.status"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              v-model="form.episodes_watched"
              type="number"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <!-- Rating -->
          <div class="mb-4">
            <label class="block text-gray-700">Rating</label>
            <input
              v-model="form.rating"
              type="number"
              min="1"
              max="10"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <!-- Notes -->
          <div class="mb-4">
            <label class="block text-gray-700">Notes</label>
            <textarea
              v-model="form.notes"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
  
          <!-- Buttons -->
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="$emit('close')"
              class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps({
anime: {
    type: Object,
    required: true,
},
});

const emit = defineEmits(['close', 'updated']);

const form = ref({
status: props.anime.status,
episodes_watched: props.anime.episodes_watched,
rating: props.anime.rating,
notes: props.anime.notes,
});

const handleSave = async () => {
try {
    const response = await axios.put(
    `http://localhost:5000/anime-list/${props.anime.id}`,
    form.value,
    { withCredentials: true }
    );

    if (response.status === 200) {
    emit('updated');
    emit('close');
    }
} catch (err) {
    console.error('Failed to update anime:', err);
    alert('Failed to update anime. Please try again.');
}};
</script>