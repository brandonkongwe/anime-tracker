<template>
  <div class="bg-gray-50 font-sans">
    <!-- Hero Section -->
    <section class="anime-bg py-40">
      <div class="container mx-auto px-4 content-overlay">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">Track Your Anime Journey</h1>
          <p class="text-xl text-gray-200 mb-8">Keep track of your favorite anime, manage your watchlist, and never lose your place again.</p>
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <router-link to="/register" class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md text-lg font-medium transition duration-200">Get Started</router-link>
            <a href="#features" @click.prevent="scrollToFeatures" class="bg-white hover:bg-gray-100 text-indigo-600 px-8 py-3 rounded-md text-lg font-medium transition duration-200">Learn More</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" ref="featuresSection" class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose AnimeTracker?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="bg-white rounded-lg shadow-md p-6 transition duration-300 card-hover">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <font-awesome-icon :icon="['fas', feature.icon]"  />
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="text-center">
            <div class="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              {{ index + 1 }}
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ step.title }}</h3>
            <p class="text-gray-600">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="hero-gradient py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-6">Ready to Start Tracking?</h2>
        <p class="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">Join thousands of anime fans who use AnimeTracker to organize their watching experience.</p>
        <router-link to="/register" class="bg-white hover:bg-gray-100 text-indigo-600 px-8 py-3 rounded-md text-lg font-medium transition duration-200">Sign Up Now - It's Free!</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const featuresSection = ref(null);


const features = [
  { 
    icon: 'fa-search', 
    title: 'Search Anime', 
    description: 'Easily search and find any anime from our extensive database powered by the Jikan API.'
  },
  { 
    icon: 'fa-list-check', 
    title: 'Track Progress', 
    description: 'Keep track of episodes watched, ratings, and your personal notes for each anime.'
  },
  { 
    icon: 'fa-user', 
    title: 'Personal Profile', 
    description: 'Customize your profile and manage your anime collection in one place.'
  }
];

const steps = [
  { 
    title: 'Create Account', 
    description: 'Sign up for a free account to start tracking your anime.'
  },
  { 
    title: 'Search Anime', 
    description: 'Find your favorite anime or discover new ones.'
  },
  { 
    title: 'Add to List', 
    description: 'Add anime to your personal tracking list.'
  },
  { 
    title: 'Track Progress', 
    description: 'Update your progress as you watch episodes.'
  }
];


const scrollToFeatures = () => {
  featuresSection.value.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
.hero-gradient {
  background: linear-gradient(135deg, #6366F1 0%, #3B82F6 100%);
}
.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
.anime-bg {
  background-image: url('src/assets/images/hero.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}
.anime-bg::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(17, 24, 39, 0.7);
  z-index: 1;
}
.content-overlay {
  position: relative;
  z-index: 2;
}
</style>

