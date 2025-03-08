<template>
  <div class="container mx-auto px-4 py-12 flex items-center">
    <div class="w-1/2">
      <h1 class="text-4xl text-black font-bold text-center mx-160 mb-4">Welcome</h1>
      <div class="flex space-x-4">
        <RouterLink to="/login" 
                     class="border-2 mx-170 border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-600 hover:text-white transition">
          Login
        </RouterLink>
      </div>
    </div>
  </div>
</template>