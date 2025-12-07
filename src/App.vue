<script setup lang="ts">
import NavigationBar from "./components/NaigationBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <main class="w-dvw h-dvh flex flex-col items-center bg-slate-900">
    <NavigationBar />
    <div class="w-dvw grow">
      <RouterView class="w-full h-full"></RouterView>
    </div>
  </main>
</template>

<style scoped></style>
