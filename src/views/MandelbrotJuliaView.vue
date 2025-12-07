<script setup lang="ts">
import EscapeControls from "../components/EscapeControls.vue";
import FractalEscapeCanvas from "../components/FractalEscapeCanvas.vue";
</script>

<template>
  <div class="w-full h-full flex">
    <aside class="w-1/5 min-w-56 h-full p-8 text-white">
      <EscapeControls />
    </aside>

    <section class="grow h-full p-8">
      <FractalEscapeCanvas />
    </section>
  </div>
</template>

<style scoped></style>
