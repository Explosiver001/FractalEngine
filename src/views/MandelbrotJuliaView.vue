<script setup lang="ts">
import { ref } from "vue";
import EscapeControls from "../components/EscapeControls.vue";
import FractalEscapeCanvas from "../components/FractalEscapeCanvas.vue";
import type { EscapeSettings } from "../webgl/WebGLEscapeRenderer";

interface ViewState {
  centerX: number;
  centerY: number;
  scale: number;
}

const escapeSettings = ref<EscapeSettings>({
  type: "mandelbrot",
  iterations: 200,
  power: 2,
  colorA: "#22d3ee",
  colorB: "#a855f7",
  attractorColor: "#05060b",
  juliaRe: -0.4,
  juliaIm: 0.6,
  showContours: true,
  contourStep: 5,
});

const viewState = ref<ViewState>({
  centerX: -0.5,
  centerY: 0.0,
  scale: 3.0,
});
</script>

<template>
  <div class="w-full h-full flex">
    <aside class="w-1/5 min-w-56 h-full p-4 rounded-2xl">
      <EscapeControls
        v-model:settings="escapeSettings"
        v-model:view="viewState"
      />
    </aside>

    <section class="grow h-full p-4 rounded-2xl">
      <FractalEscapeCanvas
        class="h-full"
        v-model:settings="escapeSettings"
        v-model:view="viewState"
      />
    </section>
  </div>
</template>
