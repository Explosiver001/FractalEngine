<script setup lang="ts">
import { ref, watch } from "vue";
import AttractorControls from "../components/AttractorControls.vue";
import AttractorCanvas from "../components/AttractorCanvas.vue";
import { createDefaultAttractorState, randomPreset } from "../attractors";

const attractorState = ref(createDefaultAttractorState());

watch(
  () => attractorState.value.type,
  (type) => {
    attractorState.value.params = randomPreset(type);
  },
);

function rerollParams() {
  attractorState.value.params = randomPreset(attractorState.value.type);
}
</script>

<template>
  <div class="w-full h-full flex">
    <aside class="w-1/5 min-w-56 h-full p-4 rounded-2xl">
      <AttractorControls v-model:state="attractorState" @reroll="rerollParams" />
    </aside>

    <section class="grow h-full p-4 rounded-2xl">
      <AttractorCanvas v-model:state="attractorState" class="h-full" />
    </section>
  </div>
</template>
