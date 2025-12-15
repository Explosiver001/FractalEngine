<script setup lang="ts">
// Page that renders Mandelbrot or Julia sets and exposes settings for the shader.
import { ref } from "vue";
import EscapeControls from "../components/EscapeControls.vue";
import FractalEscapeCanvas from "../components/FractalEscapeCanvas.vue";
import {
  type EscapeSettings,
  createEscapeSettings,
} from "../webgl/WebGLEscapeRenderer";

interface ViewState {
  centerX: number;
  centerY: number;
  scale: number;
}

// All shader uniforms are stored in reactive settings to keep the renderer in sync.
const escapeSettings = ref<EscapeSettings>(createEscapeSettings());

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
