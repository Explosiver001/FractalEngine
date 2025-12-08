<script setup lang="ts">
import { watch, toRef } from "vue";
import { useAttractor } from "../composables/useAttractor";

const { state, setParams, rerollParams } = useAttractor();

const settings = toRef(state);

// Sync Vue reactive param changes into the fractal engine
watch(
  () => settings.value.params,
  (params) => setParams({ ...params }),
  { deep: true },
);
</script>

<template>
  <div
    class="flex flex-col gap-3 text-white rounded-2xl backdrop-blur-md bg-gray-900/80 border border-white/10 shadow-xl p-4"
  >
    <!-- Title -->
    <h2
      class="text-2xl font-bold tracking-wide bg-gradient-to-r from-teal-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm"
    >
      Peter de Jong Strange Attractor
    </h2>

    <!-- a -->
    <div class="flex flex-col gap-1">
      <label class="text-teal-200/80 font-medium">Konstanta a</label>
      <input
        v-model.number="settings.params.a"
        type="number"
        step="0.05"
        class="w-full bg-gray-800/70 border border-white/10 rounded-lg px-2 py-1 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400/70 transition"
      />
    </div>

    <!-- b -->
    <div class="flex flex-col gap-1">
      <label class="text-teal-200/80 font-medium">Konstanta b</label>
      <input
        v-model.number="settings.params.b"
        type="number"
        step="0.05"
        class="w-full bg-gray-800/70 border border-white/10 rounded-lg px-2 py-1 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400/70 transition"
      />
    </div>

    <!-- c -->
    <div class="flex flex-col gap-1">
      <label class="text-teal-200/80 font-medium">Konstanta c</label>
      <input
        v-model.number="settings.params.c"
        type="number"
        step="0.05"
        class="w-full bg-gray-800/70 border border-white/10 rounded-lg px-2 py-1 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400/70 transition"
      />
    </div>

    <!-- d -->
    <div class="flex flex-col gap-1">
      <label class="text-teal-200/80 font-medium">Konstanta d</label>
      <input
        v-model.number="settings.params.d"
        type="number"
        step="0.05"
        class="w-full bg-gray-800/70 border border-white/10 rounded-lg px-2 py-1 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400/70 transition"
      />
    </div>

    <!-- Iterations -->
    <div class="flex flex-col gap-1">
      <label class="flex justify-between text-teal-200/80 font-medium">
        <span>Iterace</span>
        <span class="text-purple-300">{{
          settings.iterations.toLocaleString("cs-CZ")
        }}</span>
      </label>

      <input
        v-model.number="settings.iterations"
        type="range"
        min="50000"
        max="500000"
        step="25000"
        class="w-full accent-teal-300 cursor-pointer"
      />
    </div>

    <!-- Gamma -->
    <div class="flex flex-col gap-1">
      <label class="flex justify-between text-teal-200/80 font-medium">
        <span>Gamma</span>
        <span class="text-purple-300">{{ settings.gamma.toFixed(2) }}</span>
      </label>

      <input
        v-model.number="settings.gamma"
        type="range"
        min="0.3"
        max="1.5"
        step="0.05"
        class="w-full accent-teal-300 cursor-pointer"
      />
    </div>

    <!-- Brightness -->
    <div class="flex flex-col gap-1">
      <label class="flex justify-between text-teal-200/80 font-medium">
        <span>Jas</span>
        <span class="text-purple-300">{{
          settings.brightness.toFixed(2)
        }}</span>
      </label>

      <input
        v-model.number="settings.brightness"
        type="range"
        min="0.5"
        max="3"
        step="0.1"
        class="w-full accent-teal-300 cursor-pointer"
      />
    </div>

    <!-- Button -->
    <button
      type="button"
      @click="rerollParams"
      class="w-full py-2 rounded-lg text-black font-semibold shadow-lg bg-gradient-to-r from-teal-400 to-purple-500 hover:opacity-90 transition cursor-pointer"
    >
      Náhodný atraktor
    </button>
  </div>
</template>
