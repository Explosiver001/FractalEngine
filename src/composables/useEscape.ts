import { reactive } from "vue";
import { createGL } from "../webgl/glUtils";
import { WebGLEscapeRenderer, type EscapeSettings } from "../webgl/WebGLEscapeRenderer";

export type EscapeMode = "mandelbrot" | "julia";

interface ViewState {
  centerX: number;
  centerY: number;
  scale: number;
}

const escapeState = reactive({
  canvas: null as HTMLCanvasElement | null,
  gl: null as WebGLRenderingContext | null,
  renderer: null as WebGLEscapeRenderer | null,
  view: {
    centerX: -0.5,
    centerY: 0.0,
    scale: 3.0
  } as ViewState,
  settings: {
    type: "mandelbrot",
    iterations: 200,
    power: 2,
    palette: "classic",
    juliaRe: -0.4,
    juliaIm: 0.6,
    showContours: true,
    contourStep: 5
  } as EscapeSettings
});

export function useEscape() {
  function attachCanvas(canvas: HTMLCanvasElement) {
    escapeState.canvas = canvas;
    escapeState.gl = createGL(canvas);
    escapeState.renderer = new WebGLEscapeRenderer(escapeState.gl, canvas);
    escapeState.renderer.setOptions(escapeState.settings);
    render();
  }

  function setOptions(opts: Partial<EscapeSettings>) {
    escapeState.settings = { ...escapeState.settings, ...opts };
    escapeState.renderer?.setOptions(opts);
    render();
  }

  function pan(dxPx: number, dyPx: number) {
    const canvas = escapeState.canvas;
    if (!canvas) return;
    const aspect = canvas.height / canvas.width;
    const vw = escapeState.view.scale;
    const vh = vw * aspect;

    escapeState.view.centerX -= dxPx / canvas.width * vw;
    escapeState.view.centerY += dyPx / canvas.height * vh;

    render();
  }

  function zoomAt(px: number, py: number, factor: number) {
    const canvas = escapeState.canvas;
    if (!canvas) return;

    const W = canvas.width;
    const H = canvas.height;
    const aspect = H / W;

    const vw = escapeState.view.scale;
    const vh = vw * aspect;

    const minX = escapeState.view.centerX - vw / 2;
    const maxX = escapeState.view.centerX + vw / 2;
    const minY = escapeState.view.centerY - vh / 2;
    const maxY = escapeState.view.centerY + vh / 2;

    const nx = px / W;
    const ny = py / H;

    const cx = minX + nx * (maxX - minX);
    const cy = maxY - ny * (maxY - minY);

    const newScale = escapeState.view.scale * factor;
    escapeState.view.scale = newScale;

    const newVw = escapeState.view.scale;
    const newVh = newVw * aspect;

    escapeState.view.centerX = cx - (nx - 0.5) * newVw;
    escapeState.view.centerY = cy - (0.5 - ny) * newVh;

    render();
  }

  function render() {
    if (!escapeState.canvas || !escapeState.renderer) return;
    escapeState.renderer.render({
      canvas: escapeState.canvas,
      view: escapeState.view
    });
  }

  return {
    state: escapeState,
    attachCanvas,
    setOptions,
    pan,
    zoomAt,
    render
  };
}
