import { reactive } from "vue";
import { createGL } from "../webgl/glUtils";
import {
  WebGLEscapeRenderer,
  type EscapeSettings,
} from "../webgl/WebGLEscapeRenderer";

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
    scale: 3.0,
  } as ViewState,
  settings: {
    type: "mandelbrot",
    iterations: 200,
    power: 2,
    palette: "classic",
    juliaRe: -0.4,
    juliaIm: 0.6,
    showContours: true,
    contourStep: 5,
  } as EscapeSettings,
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

    escapeState.view.centerX -= (dxPx / canvas.width) * vw;
    escapeState.view.centerY += (dyPx / canvas.height) * vh;

    render();
  }

  function zoomAt(nx: number, ny: number, factor: number) {
  const view = escapeState.view;

  const aspect = escapeState.canvas
    ? escapeState.canvas.height / escapeState.canvas.width
    : 1;

  const vw = view.scale;
  const vh = vw * aspect;

  const minX = view.centerX - vw / 2;
  const maxX = view.centerX + vw / 2;
  const minY = view.centerY - vh / 2;
  const maxY = view.centerY + vh / 2;

  // Bod pod kurzorem v komplexní rovině (před zoomem)
  const cx = minX + nx * (maxX - minX);
  const cy = maxY - ny * (maxY - minY); // Y je invertovaná

  // Nový scale
  const newScale = vw * factor;
  view.scale = newScale;

  const newVw = newScale;
  const newVh = newVw * aspect;

  // Nastav nový střed tak, aby bod pod kurzorem zůstal na stejném místě
  view.centerX = cx - (nx - 0.5) * newVw;
  view.centerY = cy - (0.5 - ny) * newVh;

  render();
}


  function render() {
    if (!escapeState.canvas || !escapeState.renderer) return;
    escapeState.renderer.render({
      canvas: escapeState.canvas,
      view: escapeState.view,
    });
  }

  return {
    state: escapeState,
    attachCanvas,
    setOptions,
    pan,
    zoomAt,
    render,
  };
}
