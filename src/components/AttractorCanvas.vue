<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useAttractor } from "../composables/useAttractor";

const { state } = useAttractor();
const canvasRef = ref<HTMLCanvasElement | null>(null);
const busy = ref(false);

function renderAttractor() {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  busy.value = true;

  const rect = canvas.getBoundingClientRect();
  if (rect.width && rect.height) {
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  const width = canvas.width;
  const height = canvas.height;

  ctx.fillStyle = "#050509";
  ctx.fillRect(0, 0, width, height);

  const hist = new Float32Array(width * height);

  let x = 0.0;
  let y = 0.0;

  const { a, b, c, d } = state.params;
  const totalIter = state.iterations;
  const warmup = 2000;

  // průzkum rozsahu
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  for (let i = 0; i < warmup; i++) {
    const nx = Math.sin(a * y) - Math.cos(b * x);
    const ny = Math.sin(c * x) - Math.cos(d * y);
    x = nx;
    y = ny;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  const margin = 0.1;
  const dx = maxX - minX || 1.0;
  const dy = maxY - minY || 1.0;
  minX -= dx * margin;
  maxX += dx * margin;
  minY -= dy * margin;
  maxY += dy * margin;

  const rangeX = maxX - minX || 1.0;
  const rangeY = maxY - minY || 1.0;

  // reset pozice pro skutečný render
  x = 0.0;
  y = 0.0;

  // warmup znovu, aby se orbit přiblížil atraktoru
  for (let i = 0; i < warmup; i++) {
    const nx = Math.sin(a * y) - Math.cos(b * x);
    const ny = Math.sin(c * x) - Math.cos(d * y);
    x = nx;
    y = ny;
  }

  // akumulace bodů
  for (let i = 0; i < totalIter; i++) {
    const nx = Math.sin(a * y) - Math.cos(b * x);
    const ny = Math.sin(c * x) - Math.cos(d * y);
    x = nx;
    y = ny;

    const u = (x - minX) / rangeX;
    const v = (y - minY) / rangeY;
    if (u < 0 || u > 1 || v < 0 || v > 1) continue;

    const px = Math.floor(u * (width - 1));
    const py = Math.floor((1 - v) * (height - 1)); // invert Y

    const idx = py * width + px;
    hist[idx] += 1;
  }

  // najít maximum hustoty
  let maxVal = 0;
  for (let i = 0; i < hist.length; i++) {
    if (hist[i] > maxVal) maxVal = hist[i];
  }
  const gamma = state.gamma;
  const brightness = state.brightness;

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  function palette(t: number): [number, number, number] {
    const r = Math.floor(255 * Math.pow(t, 0.5));
    const g = Math.floor(255 * t);
    const b = Math.floor(255 * (0.2 + 0.8 * (1 - t)));
    return [r, g, b];
  }

  for (let i = 0; i < hist.length; i++) {
    const v = hist[i];
    if (v <= 0) continue;
    const n = v / maxVal;
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

  ctx.putImageData(imageData, 0, 0);
  busy.value = false;
}

onMounted(() => {
  renderAttractor();
});

watch(
  () => ({
    ...state.params,
    iterations: state.iterations,
    gamma: state.gamma,
    brightness: state.brightness,
  }),
  () => {
    renderAttractor();
  },
);
</script>

<template>
  <div class="canvas-wrapper">
    <canvas ref="canvasRef" class="attractor-canvas"></canvas>
    <div v-if="busy" class="busy">počítám…</div>
  </div>
</template>

<style scoped>
.canvas-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.attractor-canvas {
  width: 100%;
  height: 100%;
  background: #050509;
  border-radius: 8px;
  border: 1px solid #333;
}

.busy {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 4px 8px;
  font-size: 11px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
}
</style>
