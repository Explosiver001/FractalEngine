<script setup lang="ts">
import { computed } from "vue";
import { useEscape } from "../composables/useEscape";

const { state, setOptions, render } = useEscape();

const settings = computed(() => state.settings);
const view = computed(() => state.view);

function updateSelect(key: "type" | "palette", e: Event) {
  const value = (e.target as HTMLSelectElement).value;
  setOptions({ [key]: value } as any);
}

function updateRange(key: "iterations" | "power" | "contourStep", e: Event) {
  const value = Number((e.target as HTMLInputElement).value);
  setOptions({ [key]: value } as any);
}

function updateNumber(key: "juliaRe" | "juliaIm", e: Event) {
  const value = parseFloat((e.target as HTMLInputElement).value);
  if (!Number.isNaN(value)) {
    setOptions({ [key]: value } as any);
  }
}

function toggleContours(e: Event) {
  const checked = (e.target as HTMLInputElement).checked;
  setOptions({ showContours: checked });
}

function onGlobalZoom(e: Event) {
  const v = Number((e.target as HTMLInputElement).value);
  if (v <= 0) return;
  // slider ~ relative inverse zoom
  state.view.scale = 3.0 / v;
  render();
}
</script>

<template>
  <div class="controls">
    <h2 class="title">Mandelbrot / Julia (WebGL)</h2>

    <div class="group">
      <label>Typ</label>
      <select :value="settings.type" @change="updateSelect('type', $event)">
        <option value="mandelbrot">Mandelbrot</option>
        <option value="julia">Julia</option>
      </select>
    </div>

    <div class="group">
      <label>
        Iterace
        <span>{{ settings.iterations }}×</span>
      </label>
      <input
        type="range"
        min="20"
        max="500"
        :value="settings.iterations"
        @input="updateRange('iterations', $event)"
      />
    </div>

    <div class="group">
      <label>
        Globální zoom
      </label>
      <input
        type="range"
        min="0.5"
        max="5"
        step="0.1"
        :value="3.0 / view.scale"
        @input="onGlobalZoom($event)"
      />
      <small>Myší kolečko zoomuje kolem kurzoru, tento slider mění globální měřítko.</small>
    </div>

    <div class="group">
      <label>
        Exponent k (z^k)
        <span>{{ settings.power }}</span>
      </label>
      <input
        type="range"
        min="2"
        max="6"
        step="1"
        :value="settings.power"
        @input="updateRange('power', $event)"
      />
    </div>

    <div class="group">
      <label>Julia: konstanta c (re, im)</label>
      <input
        type="number"
        step="0.01"
        :value="settings.juliaRe"
        @change="updateNumber('juliaRe', $event)"
      />
      <input
        type="number"
        step="0.01"
        :value="settings.juliaIm"
        @change="updateNumber('juliaIm', $event)"
      />
    </div>

    <div class="group">
      <label>Barevná paleta</label>
      <select :value="settings.palette" @change="updateSelect('palette', $event)">
        <option value="classic">Klasická</option>
        <option value="fire">Oheň</option>
        <option value="pastel">Pastel</option>
      </select>
    </div>

    <div class="group">
      <label class="row">
        Vrstevnice
        <input
          type="checkbox"
          :checked="settings.showContours"
          @change="toggleContours($event)"
        />
      </label>
      <small>Čára každých N iterací.</small>
      <label>Interval vrstevnic N</label>
      <input
        type="number"
        min="1"
        :value="settings.contourStep"
        @change="updateRange('contourStep', $event)"
      />
    </div>

    <button type="button" class="render-btn" @click="render">
      Přepočítat fraktál
    </button>
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

label.row {
  flex-direction: row;
}

input[type="range"],
input[type="number"],
select {
  width: 100%;
}

small {
  color: #888;
  font-size: 11px;
}

.render-btn {
  margin-top: 6px;
  background: #2d7dff;
  border: none;
  color: #fff;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.render-btn:hover {
  filter: brightness(1.1);
}
</style>
