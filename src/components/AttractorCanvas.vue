<script setup lang="ts">
// 2D canvas renderer for iterated chaotic attractors.
import { computed, onMounted, ref, watch, nextTick, type PropType } from "vue";
import {
  attractorDefinitions,
  type AttractorFormula,
  type AttractorState,
} from "../attractors";

// Shared state passed in from the view and updated via the control panel.
const attractorState = defineModel("state", {
  type: Object as PropType<AttractorState>,
  required: true,
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
const busy = ref(false);

const width = ref(0);
const height = ref(0);

const selectedDefinition = computed(
  () => attractorDefinitions[attractorState.value.type],
);

// Make the canvas pixel buffer follow the displayed size so the image stays sharp.
function syncCanvasResolution() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();

  if (rect.width <= 0 || rect.height <= 0) return;

  canvas.width = Math.floor(rect.width);
  canvas.height = Math.floor(rect.height);

  width.value = canvas.width;
  height.value = canvas.height;
}

// Compute the histogram of visited pixels and paint it using the configured palette.
function renderAttractor() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  syncCanvasResolution();

  const ctx = canvas.getContext("2d");
  if (!ctx || width.value === 0 || height.value === 0) return;

  busy.value = true;

  const hist = new Float32Array(width.value * height.value);

  let x = 0.0;
  let y = 0.0;

  const { a, b, c, d } = attractorState.value.params;
  const totalIter = attractorState.value.iterations;
  const warmup = 2000;

  const nextPoint: AttractorFormula = (currX: number, currY: number) =>
    selectedDefinition.value.formula(currX, currY, { a, b, c, d });

  let minX = Infinity,
    maxX = -Infinity;
  let minY = Infinity,
    maxY = -Infinity;

  // Warmup iterations discard the transient part of the orbit and measure extents.
  for (let i = 0; i < warmup; i++) {
    const { x: nx, y: ny } = nextPoint(x, y);
    x = nx;
    y = ny;

    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  const margin = 0.1;
  const dx = maxX - minX || 1;
  const dy = maxY - minY || 1;

  minX -= dx * margin;
  maxX += dx * margin;
  minY -= dy * margin;
  maxY += dy * margin;

  const rangeX = maxX - minX;
  const rangeY = maxY - minY;

  x = 0;
  y = 0;

  // Run another warmup without tracking bounds to settle on the attractor.
  for (let i = 0; i < warmup; i++) {
    const { x: nx, y: ny } = nextPoint(x, y);
    x = nx;
    y = ny;
  }

  // Histogram how often each pixel gets visited to capture density variations.
  for (let i = 0; i < totalIter; i++) {
    const { x: nx, y: ny } = nextPoint(x, y);
    x = nx;
    y = ny;

    const u = (x - minX) / rangeX;
    const v = (y - minY) / rangeY;
    if (u < 0 || u > 1 || v < 0 || v > 1) continue;

    const px = Math.floor(u * (width.value - 1));
    const py = Math.floor((1 - v) * (height.value - 1));

    hist[py * width.value + px] += 1;
  }

  let maxVal = 0;
  for (let i = 0; i < hist.length; i++) if (hist[i] > maxVal) maxVal = hist[i];

  const gamma = attractorState.value.gamma;
  const brightness = attractorState.value.brightness;
  const { colorA, colorB } = attractorState.value;

  function hexToRgb(hex: string): [number, number, number] {
    const clean = hex.replace("#", "");
    if (clean.length !== 6) return [255, 255, 255];

    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16),
    ];
  }

  const rgbA = hexToRgb(colorA);
  const rgbB = hexToRgb(colorB);

  const image = ctx.createImageData(width.value, height.value);
  const data = image.data;

  function palette(t: number) {
    return [
      Math.floor(rgbA[0] + (rgbB[0] - rgbA[0]) * t),
      Math.floor(rgbA[1] + (rgbB[1] - rgbA[1]) * t),
      Math.floor(rgbA[2] + (rgbB[2] - rgbA[2]) * t),
    ];
  }

  for (let i = 0; i < hist.length; i++) {
    if (hist[i] <= 0) continue;

    const n = hist[i] / maxVal;
    const mapped = Math.pow(
      Math.log(1 + n * brightness) / Math.log(1 + brightness),
      gamma,
    );

    const [r, g, b] = palette(mapped);
    const di = i * 4;
    data[di] = r;
    data[di + 1] = g;
    data[di + 2] = b;
    data[di + 3] = 255;
  }

  ctx.putImageData(image, 0, 0);
  busy.value = false;
}

onMounted(async () => {
  await nextTick();
  syncCanvasResolution();
  renderAttractor();
});

watch(attractorState, () => renderAttractor(), { deep: true });
</script>

<template>
  <div
    class="relative w-full h-full rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-md shadow-xl"
  >
    <canvas ref="canvasRef" class="w-full h-full rounded-2xl"></canvas>

    <div
      v-if="busy"
      class="absolute right-2 bottom-2 px-3 py-1 text-xs rounded-lg bg-black/70 text-gray-200"
    >
      počítám…
    </div>
  </div>
</template>
