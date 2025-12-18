<script setup lang="ts">
// Root layout that wraps the navigation bar, current view and a footer.
import NavigationBar from "./components/NaigationBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <!-- Main shell keeps the app centered, dark themed and full height. -->
  <main class="w-full h-full flex flex-col items-center min-h-dvh bg-slate-900 min-w-[1200px]">
    <NavigationBar />
    <!-- Swaps the page content according to the current route. -->
    <div class="grow w-full">
      <RouterView class="w-full h-full"></RouterView>
    </div>
    <footer class="w-full py-4 text-center text-sm text-slate-300 border-t border-white/5">
      © 2025 - Fractal Engine by <strong><a href="https://www.linkedin.com/in/mnovakdev">Michal Novák</a></strong>. All rights reserved.
    </footer>
  </main>
</template>

<style scoped></style>
