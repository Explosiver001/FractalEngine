<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useEscape } from "../composables/useEscape";

const { attachCanvas, pan, zoomAt } = useEscape();

const canvasRef = ref<HTMLCanvasElement | null>(null);

let dragging = false;
let lastX = 0;
let lastY = 0;

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  if (rect.width && rect.height) {
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  attachCanvas(canvas);

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
    pan(dx, dy);
  });

  canvas.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 0.8 : 1.25;
      const rect2 = canvas.getBoundingClientRect();
      const x = e.clientX - rect2.left;
      const y = e.clientY - rect2.top;
      zoomAt(x, y, factor);
    },
    { passive: false },
  );
});
</script>

<template>
  <canvas ref="canvasRef" class="fractal-canvas"></canvas>
</template>

<style scoped>
.fractal-canvas {
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 8px;
  border: 1px solid #333;
  cursor: grab;
}

.fractal-canvas.dragging {
  cursor: grabbing;
}
</style>
