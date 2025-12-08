<script setup lang="ts">
import EscapeControls from "../components/EscapeControls.vue";
import FractalEscapeCanvas from "../components/FractalEscapeCanvas.vue";
</script>

<template>
  <div class="w-full h-full flex">
    <!-- Sidebar (kept narrow + frosted) -->
    <aside class="w-1/5 min-w-56 h-full p-4 rounded-2xl">
      <EscapeControls />
    </aside>

    <!-- Main Canvas Area (fills all remaining space) -->
    <section class="grow h-full p-4 rounded-2xl">
      <FractalEscapeCanvas class="h-full" />
    </section>
  </div>
</template>
