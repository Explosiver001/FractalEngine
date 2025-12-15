<template>
  <nav class="w-full flex justify-center mt-4">
    <div
      class="backdrop-blur-md bg-gray-900/80 text-white rounded-2xl shadow-xl px-6 py-4 flex items-center justify-between w-[90%] md:w-3/4 border border-white/10"
    >
      <!-- Title / Logo -->
      <h1
        class="text-2xl font-bold tracking-wide bg-gradient-to-r from-teal-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm"
      >
        Fractal Engine
      </h1>

      <!-- Desktop Links -->
      <div class="hidden md:flex space-x-10 text-lg font-medium">
        <RouterLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="relative group transition"
          active-class="text-teal-300 drop-shadow"
        >
          <span
            class="bg-gradient-to-r from-teal-200 to-blue-300 bg-clip-text text-transparent group-hover:from-teal-300 group-hover:to-purple-300 transition"
          >
            {{ item.label }}
          </span>

          <span
            class="absolute left-0 -bottom-1 w-0 h-[2px] bg-teal-300 group-hover:w-full transition-all duration-300 rounded-full"
          ></span>
        </RouterLink>
      </div>

      <!-- Mobile Toggle -->
      <button
        class="md:hidden text-gray-300 hover:text-white transition text-3xl"
        @click="open = !open"
      >
        ☰
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="open"
      class="md:hidden w-[90%] md:w-3/4 bg-gray-900/80 backdrop-blur-md text-white rounded-xl shadow-lg mt-3 py-4 flex flex-col items-center space-y-4 text-lg font-medium border border-white/10"
    >
      <RouterLink
        v-for="item in navItems"
        :key="item.label"
        :to="item.to"
        class="relative group transition"
        active-class="text-teal-300 drop-shadow"
        @click="open = false"
      >
        <span
          class="bg-gradient-to-r from-teal-200 to-blue-300 bg-clip-text text-transparent group-hover:from-teal-300 group-hover:to-purple-300 transition"
        >
          {{ item.label }}
        </span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const open = ref(false);

const navItems = [
  { label: "Mandelbrot / Julia", to: { name: "mandelbrot-julia" } },
  { label: "Atraktory", to: { name: "attractors" } },
  { label: "O aplikaci", to: { name: "about" } },
];
</script>
