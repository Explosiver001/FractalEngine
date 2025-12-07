<script setup lang="ts">
import { useAttractor } from "../composables/useAttractor";

const { state, setParams, rerollParams } = useAttractor();

function updateNumber(key: "a" | "b" | "c" | "d", e: Event) {
  const val = parseFloat((e.target as HTMLInputElement).value);
  if (!Number.isNaN(val)) {
    setParams({ [key]: val } as any);
  }
}
</script>

<template>
  <div class="controls">
    <h2 class="title">Peter de Jong Strange Attractor</h2>
    <p class="hint">
      Nelineární fraktál s jednoduchým mapováním:<br />
      xₙ₊₁ = sin(a·yₙ) − cos(b·xₙ)<br />
      yₙ₊₁ = sin(c·xₙ) − cos(d·yₙ)
    </p>

    <div class="group">
      <label>a</label>
      <input
        type="number"
        step="0.05"
        :value="state.params.a"
        @change="updateNumber('a', $event)"
      />
    </div>
    <div class="group">
      <label>b</label>
      <input
        type="number"
        step="0.05"
        :value="state.params.b"
        @change="updateNumber('b', $event)"
      />
    </div>
    <div class="group">
      <label>c</label>
      <input
        type="number"
        step="0.05"
        :value="state.params.c"
        @change="updateNumber('c', $event)"
      />
    </div>
    <div class="group">
      <label>d</label>
      <input
        type="number"
        step="0.05"
        :value="state.params.d"
        @change="updateNumber('d', $event)"
      />
    </div>

    <div class="group">
      <label
        >Iterace
        <span>{{ state.iterations.toLocaleString("cs-CZ") }}</span></label
      >
      <input
        type="range"
        min="50000"
        max="500000"
        step="25000"
        :value="state.iterations"
        @input="
          state.iterations = Number(($event.target as HTMLInputElement).value)
        "
      />
    </div>

    <div class="group">
      <label
        >Gamma <span>{{ state.gamma.toFixed(2) }}</span></label
      >
      <input
        type="range"
        min="0.3"
        max="1.5"
        step="0.05"
        :value="state.gamma"
        @input="state.gamma = Number(($event.target as HTMLInputElement).value)"
      />
    </div>

    <div class="group">
      <label
        >Jas (brightness) <span>{{ state.brightness.toFixed(2) }}</span></label
      >
      <input
        type="range"
        min="0.5"
        max="3"
        step="0.1"
        :value="state.brightness"
        @input="
          state.brightness = Number(($event.target as HTMLInputElement).value)
        "
      />
    </div>

    <button type="button" @click="rerollParams">Náhodný atraktor</button>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  font-size: 14px;
  margin: 4px 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #bbb;
}

.hint {
  font-size: 11px;
  color: #aaa;
  line-height: 1.4;
}

.group {
  margin-bottom: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

label {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input[type="range"],
input[type="number"] {
  width: 100%;
}

button {
  margin-top: 8px;
  background: #2d7dff;
  border: none;
  color: #fff;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

button:hover {
  filter: brightness(1.1);
}
</style>
