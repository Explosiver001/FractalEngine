<script setup lang="ts">
import { onMounted, ref, watch, type PropType } from "vue";
import { createGL } from "../webgl/glUtils";
import {
  WebGLEscapeRenderer,
  type EscapeSettings,
} from "../webgl/WebGLEscapeRenderer";

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

const canvasRef = ref<HTMLCanvasElement | null>(null);
const renderer = ref<WebGLEscapeRenderer | null>(null);

let dragging = false;
let lastX = 0;
let lastY = 0;

function render() {
  if (!canvasRef.value || !renderer.value) return;

  renderer.value.render({
    canvas: canvasRef.value,
    view: view.value,
  });
}

function setupCanvas() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  if (rect.width && rect.height) {
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  const gl = createGL(canvas);
  renderer.value = new WebGLEscapeRenderer(gl, canvas);
  renderer.value.setOptions(settings.value);
  render();
}

function pan(dxPx: number, dyPx: number) {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const aspect = canvas.height / canvas.width;
  const vw = view.value.scale;
  const vh = vw * aspect;

  view.value.centerX -= (dxPx / canvas.width) * vw;
  view.value.centerY += (dyPx / canvas.height) * vh;

  render();
}

function zoomAt(nx: number, ny: number, factor: number) {
  const aspect = canvasRef.value
    ? canvasRef.value.height / canvasRef.value.width
    : 1;

  const vw = view.value.scale;
  const vh = vw * aspect;

  const minX = view.value.centerX - vw / 2;
  const maxX = view.value.centerX + vw / 2;
  const minY = view.value.centerY - vh / 2;
  const maxY = view.value.centerY + vh / 2;

  const cx = minX + nx * (maxX - minX);
  const cy = maxY - ny * (maxY - minY);

  const newScale = vw * factor;
  view.value.scale = newScale;

  const newVw = newScale;
  const newVh = newVw * aspect;

  view.value.centerX = cx - (nx - 0.5) * newVw;
  view.value.centerY = cy - (0.5 - ny) * newVh;

  render();
}

onMounted(() => {
  setupCanvas();

  const canvas = canvasRef.value;
  if (!canvas) return;

  canvas.addEventListener("mousedown", (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.classList.add("dragging");
  });

  window.addEventListener("mouseup", () => {
    dragging = false;
    canvas && canvas.classList.remove("dragging");
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    pan(dx, -dy);
  });

  canvas.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 0.8 : 1.25;

      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;

      zoomAt(nx, ny, factor);
    },
    { passive: false },
  );
});

watch(
  settings,
  (next) => {
    renderer.value?.setOptions(next);
    render();
  },
  { deep: true },
);

watch(
  view,
  () => {
    render();
  },
  { deep: true },
);
</script>

<template>
  <div class="w-full h-full flex justify-center">
    <div
      class="backdrop-blur-md bg-gray-900/80 rounded-2xl shadow-xl border border-white/10 w-full h-full p-4"
    >
      <canvas ref="canvasRef" class="w-full h-full rounded-xl"></canvas>
    </div>
  </div>
</template>
