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
  </main>
</template>

<style scoped></style>
