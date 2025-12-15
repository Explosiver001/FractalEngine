<script setup lang="ts">
import { computed, type PropType } from "vue";
import type { EscapeSettings } from "../webgl/WebGLEscapeRenderer";

interface ViewState {
  centerX: number;
  centerY: number;
  scale: number;
}

const settings = defineModel("settings", {
  type: Object as PropType<EscapeSettings>,
  required: true,
});

const view = defineModel("view", {
  type: Object as PropType<ViewState>,
  required: true,
});

const globalZoom = computed({
  get: () => 3.0 / view.value.scale,
  set: (val: number) => {
    if (val > 0) {
      view.value.scale = 3.0 / val;
    }
  },
});
</script>

<template>
  <div
    class="rounded-2xl backdrop-blur-md bg-gray-900/80 border border-white/10 shadow-xl p-6 space-y-6 text-white"
  >
    <!-- Title -->
    <h2
      class="text-2xl font-bold tracking-wide bg-gradient-to-r from-teal-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm"
    >
      Mandelbrot / Julia
    </h2>

    <!-- Type -->
    <div class="flex flex-col space-y-1">
      <label class="text-teal-200/80 font-medium">Typ</label>

      <select
        v-model="settings.type"
        class="w-full bg-gray-800/70 border border-white/10 rounded-lg px-3 py-2 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-400/70 transition"
      >
        <option value="mandelbrot">Mandelbrot</option>
        <option value="julia">Julia</option>
      </select>
    </div>

    <!-- Iterace -->
    <div class="flex flex-col space-y-1">
      <label class="flex justify-between text-teal-200/80 font-medium">
        <span>Iterace</span>
        <span class="text-purple-300">{{ settings.iterations }}×</span>
      </label>

      <input
        v-model.number="settings.iterations"
        type="range"
        min="20"
        max="500"
        class="w-full accent-teal-300 cursor-pointer"
      />
    </div>

    <!-- Globální zoom -->
    <div class="flex flex-col space-y-1">
      <label class="text-teal-200/80 font-medium">Globální zoom</label>

      <input
        v-model.number="globalZoom"
        type="range"
        min="0.5"
        max="5"
        step="0.1"
        class="w-full accent-teal-300 cursor-pointer"
      />
    </div>

    <!-- Exponent -->
    <div class="flex flex-col space-y-1">
      <label class="flex justify-between text-teal-200/80 font-medium">
        <span>Exponent k (z^k)</span>
        <span class="text-purple-300">{{ settings.power }}</span>
      </label>

      <input
        v-model.number="settings.power"
        type="range"
        min="2"
        max="6"
        step="1"
        class="w-full accent-teal-300 cursor-pointer"
      />
    </div>

    <!-- Julia konstanta -->
    <div class="flex flex-col space-y-2" v-if="settings.type === 'julia'">
      <label class="text-teal-200/80 font-medium">Konstanta c (re, im)</label>

      <div class="flex space-x-3">
        <input
          v-model.number="settings.juliaRe"
          type="number"
          step="0.01"
          class="w-full bg-gray-800/70 border border-white/10 rounded-lg px-3 py-2 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400/70 transition"
        />

        <input
          v-model.number="settings.juliaIm"
          type="number"
          step="0.01"
          class="w-full bg-gray-800/70 border border-white/10 rounded-lg px-3 py-2 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400/70 transition"
        />
      </div>
    </div>

    <!-- Barvy -->
    <div class="flex flex-col space-y-2">
      <label class="text-teal-200/80 font-medium">Barvy přechodu</label>

      <div class="flex items-center gap-3">
        <div class="flex flex-col text-sm text-gray-300 gap-1">
          <span>Začátek</span>
          <input
            v-model="settings.colorA"
            type="color"
            class="w-20 h-10 bg-transparent border border-white/10 rounded-lg cursor-pointer"
          />
        </div>

        <div class="flex flex-col text-sm text-gray-300 gap-1">
          <span>Konec</span>
          <input
            v-model="settings.colorB"
            type="color"
            class="w-20 h-10 bg-transparent border border-white/10 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>

    <!-- Vrstevnice -->
    <div class="flex flex-col space-y-2">
      <label
        class="flex items-center justify-between text-teal-200/80 font-medium"
      >
        <span>Vrstevnice</span>

        <input
          v-model="settings.showContours"
          type="checkbox"
          class="w-5 h-5 rounded border-white/20 bg-gray-800/70 text-teal-300 focus:ring-teal-400 cursor-pointer"
        />
      </label>

      <small class="text-gray-300 text-sm"> Čára každých N iterací. </small>

      <label class="text-teal-200/80 font-medium">Interval vrstevnic N</label>

      <input
        v-model.number="settings.contourStep"
        type="number"
        min="1"
        class="w-full bg-gray-800/70 border border-white/10 rounded-lg px-3 py-2 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400/70 transition"
      />
    </div>
  </div>
</template>
