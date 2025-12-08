<script setup lang="ts">
import AttractorControls from "../components/AttractorControls.vue";
import AttractorCanvas from "../components/AttractorCanvas.vue";
</script>

<template>
  <div class="w-full h-full flex">
    <!-- Sidebar (same as Escape) -->
    <aside class="w-1/5 min-w-56 h-full p-4 rounded-2xl">
      <AttractorControls />
    </aside>

    <!-- Main Canvas Area (same as Escape) -->
    <section class="grow h-full p-4 rounded-2xl">
      <AttractorCanvas class="h-full" />
    </section>
  </div>
</template>
