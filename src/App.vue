<script setup lang="ts">
// Root layout that wraps the navigation bar, current view and a footer.
import NavigationBar from "./components/NaigationBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <!-- Main shell keeps the app centered, dark themed and full height. -->
  <main class="w-full h-full flex flex-col items-center bg-slate-900 min-h-dvh">
    <NavigationBar />
    <!-- Swaps the page content according to the current route. -->
    <div class="grow w-full">
      <RouterView class="w-full h-full"></RouterView>
    </div>
    <footer class="w-full py-4 text-center text-sm text-slate-300 border-t border-white/5">
      © 2024 Fractal Engine. All rights reserved.
    </footer>
  </main>
</template>

<style scoped></style>
