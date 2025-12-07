<script setup lang="ts">
import AttractorControls from "../components/AttractorControls.vue";
import AttractorCanvas from "../components/AttractorCanvas.vue";
</script>

<template>
  <div class="w-full h-full flex">
    <aside class="w-1/5 min-w-56 h-full p-8 text-white">
      <AttractorControls />
    </aside>

    <section class="grow h-full p-8">
      <AttractorCanvas />
    </section>
  </div>
</template>

<style scoped></style>
