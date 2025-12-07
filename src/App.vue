<script setup lang="ts">
import { ref } from "vue";
import FractalEscapeCanvas from "./components/FractalEscapeCanvas.vue";
import EscapeControls from "./components/EscapeControls.vue";
import AttractorCanvas from "./components/AttractorCanvas.vue";
import AttractorControls from "./components/AttractorControls.vue";

type Mode = "escape" | "attractor";

const mode = ref<Mode>("escape");
</script>

<template>
  <div class="app-layout">
    <header class="app-header">
      <div>
        <h1>Nelineární fraktální ateliér</h1>
        <span class="subtitle">
          {{ mode === 'escape' ? 'Mandelbrot / Julia (WebGL Escape)' : 'Peter de Jong Strange Attractor' }}
        </span>
      </div>
      <div class="mode-switch">
        <label>
          Režim:
          <select v-model="mode">
            <option value="escape">Mandelbrot / Julia</option>
            <option value="attractor">Strange Attractor</option>
          </select>
        </label>
      </div>
    </header>

    <main class="app-main">
      <aside class="panel-left">
        <EscapeControls v-if="mode === 'escape'" />
        <AttractorControls v-else />
      </aside>

      <section class="panel-center">
        <FractalEscapeCanvas v-if="mode === 'escape'" />
        <AttractorCanvas v-else />
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-header {
  padding: 12px 20px;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  background: #181818;
}

.app-header h1 {
  font-size: 20px;
  margin: 0;
}

.subtitle {
  font-size: 12px;
  color: #aaa;
}

.mode-switch {
  font-size: 12px;
  color: #ccc;
}

.app-main {
  flex: 1;
  display: flex;
  min-height: 0;
}

.panel-left {
  width: 300px;
  border-right: 1px solid #333;
  padding: 10px;
  background: #151515;
  box-sizing: border-box;
}

.panel-center {
  flex: 1;
  padding: 10px;
  background: #050509;
  display: flex;
  flex-direction: column;
}
</style>
