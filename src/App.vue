<script setup lang="ts">
import NavigationBar from "./components/NaigationBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <main class="w-full h-full flex flex-col items-center bg-slate-900 min-h-dvh">
    <NavigationBar />
    <div class="grow w-full">
      <RouterView class="w-full h-full"></RouterView>
    </div>
    <footer class="w-full py-4 text-center text-sm text-slate-300 border-t border-white/5">
      © 2024 Fractal Engine. All rights reserved.
    </footer>
  </main>
</template>

<style scoped></style>
