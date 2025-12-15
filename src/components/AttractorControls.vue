<script setup lang="ts">
// Form inputs for picking an attractor formula and tweaking its parameters.
import { computed, type PropType } from "vue";
import {
  attractorDefinitions,
  type AttractorState,
  type AttractorType,
} from "../attractors";

// v-model binding allows the parent view and canvas to read/write the same state.
const attractorState = defineModel("state", {
  type: Object as PropType<AttractorState>,
  required: true,
});

const emit = defineEmits<{ (event: "reroll"): void }>();

// Build human-friendly options from the attractor definitions list.
const attractorOptions = Object.entries(attractorDefinitions).map(
  ([value, def]) => ({
    value: value as AttractorType,
    label: def.title,
  }),
);

const selectedTitle = computed(
  () => attractorDefinitions[attractorState.value.type].title,
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
      {{ selectedTitle }}
    </h2>

    <!-- Attractor Type -->
    <div class="flex flex-col gap-1">
      <label class="text-teal-200/80 font-medium">Typ attractoru</label>
      <select
        v-model="attractorState.type"
        class="w-full bg-gray-800/70 border border-white/10 rounded-lg px-2 py-2 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400/70 transition cursor-pointer"
      >
        <option
          v-for="option in attractorOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>

    <!-- a -->
    <div class="flex flex-col gap-1">
      <label class="text-teal-200/80 font-medium">Konstanta a</label>
      <input
        v-model.number="attractorState.params.a"
        type="number"
        step="0.05"
        class="w-full bg-gray-800/70 border border-white/10 rounded-lg px-2 py-1 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400/70 transition"
      />
    </div>

    <!-- b -->
    <div class="flex flex-col gap-1">
      <label class="text-teal-200/80 font-medium">Konstanta b</label>
      <input
        v-model.number="attractorState.params.b"
        type="number"
        step="0.05"
        class="w-full bg-gray-800/70 border border-white/10 rounded-lg px-2 py-1 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400/70 transition"
      />
    </div>

    <!-- c -->
    <div class="flex flex-col gap-1">
      <label class="text-teal-200/80 font-medium">Konstanta c</label>
      <input
        v-model.number="attractorState.params.c"
        type="number"
        step="0.05"
        class="w-full bg-gray-800/70 border border-white/10 rounded-lg px-2 py-1 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400/70 transition"
      />
    </div>

    <!-- d -->
    <div class="flex flex-col gap-1">
      <label class="text-teal-200/80 font-medium">Konstanta d</label>
      <input
        v-model.number="attractorState.params.d"
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
          attractorState.iterations.toLocaleString("cs-CZ")
        }}</span>
      </label>

      <input
        v-model.number="attractorState.iterations"
        type="range"
        min="50000"
        max="500000"
        step="25000"
        class="w-full accent-teal-300 cursor-pointer"
      />
    </div>

    <!-- Colors -->
    <div class="flex flex-col gap-2">
      <label class="text-teal-200/80 font-medium">Barvy attractoru</label>

      <div class="flex items-center gap-3">
        <div class="flex flex-col text-sm text-gray-300 gap-1">
          <span>Primární</span>
          <input
            v-model="attractorState.colorA"
            type="color"
            class="w-20 h-10 bg-transparent border border-white/10 rounded-lg cursor-pointer"
          />
        </div>

        <div class="flex flex-col text-sm text-gray-300 gap-1">
          <span>Sekundární</span>
          <input
            v-model="attractorState.colorB"
            type="color"
            class="w-20 h-10 bg-transparent border border-white/10 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>

    <!-- Gamma -->
    <div class="flex flex-col gap-1">
      <label class="flex justify-between text-teal-200/80 font-medium">
        <span>Gamma</span>
        <span class="text-purple-300">{{ attractorState.gamma.toFixed(2) }}</span>
      </label>

      <input
        v-model.number="attractorState.gamma"
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
          attractorState.brightness.toFixed(2)
        }}</span>
      </label>

      <input
        v-model.number="attractorState.brightness"
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
      @click="emit('reroll')"
      class="w-full py-2 rounded-lg text-black font-semibold shadow-lg bg-gradient-to-r from-teal-400 to-purple-500 hover:opacity-90 transition cursor-pointer"
    >
      Náhodný atraktor
    </button>
  </div>
</template>
