import { createProgram, createFullscreenQuad } from "./glUtils";
import { escapeVS, escapeFS } from "./shadersEscape";

export type EscapeType = "mandelbrot" | "julia";
export interface EscapeSettings {
  type: EscapeType;
  iterations: number;
  power: number;
  colorA: string;
  colorB: string;
  attractorColor: string;
  juliaRe: number;
  juliaIm: number;
  showContours: boolean;
  contourStep: number;
}

export const DEFAULT_ESCAPE_SETTINGS: EscapeSettings = {
  type: "mandelbrot",
  iterations: 200,
  power: 2,
  colorA: "#38bdf8",
  colorB: "#a855f7",
  attractorColor: "#0b1021",
  juliaRe: -0.4,
  juliaIm: 0.6,
  showContours: true,
  contourStep: 5,
};

export function createEscapeSettings(): EscapeSettings {
  return { ...DEFAULT_ESCAPE_SETTINGS };
}

export class WebGLEscapeRenderer {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private quad: WebGLBuffer;

  private uResolution: WebGLUniformLocation | null;
  private uCenter: WebGLUniformLocation | null;
  private uScale: WebGLUniformLocation | null;
  private uMaxIter: WebGLUniformLocation | null;
  private uPower: WebGLUniformLocation | null;
  private uType: WebGLUniformLocation | null;
  private uJuliaC: WebGLUniformLocation | null;
  private uColorA: WebGLUniformLocation | null;
  private uColorB: WebGLUniformLocation | null;
  private uAttractorColor: WebGLUniformLocation | null;
  private uShowContours: WebGLUniformLocation | null;
  private uContourStep: WebGLUniformLocation | null;

  settings: EscapeSettings;

  constructor(gl: WebGLRenderingContext, _canvas: HTMLCanvasElement) {
    this.gl = gl;
    this.program = createProgram(gl, escapeVS, escapeFS);
    this.quad = createFullscreenQuad(gl);

    gl.useProgram(this.program);
    this.uResolution = gl.getUniformLocation(this.program, "u_resolution");
    this.uCenter = gl.getUniformLocation(this.program, "u_center");
    this.uScale = gl.getUniformLocation(this.program, "u_scale");
    this.uMaxIter = gl.getUniformLocation(this.program, "u_maxIter");
    this.uPower = gl.getUniformLocation(this.program, "u_power");
    this.uType = gl.getUniformLocation(this.program, "u_type");
    this.uJuliaC = gl.getUniformLocation(this.program, "u_juliaC");
    this.uColorA = gl.getUniformLocation(this.program, "u_colorA");
    this.uColorB = gl.getUniformLocation(this.program, "u_colorB");
    this.uAttractorColor = gl.getUniformLocation(
      this.program,
      "u_attractorColor",
    );
    this.uShowContours = gl.getUniformLocation(this.program, "u_showContours");
    this.uContourStep = gl.getUniformLocation(this.program, "u_contourStep");

    this.settings = createEscapeSettings();
  }

  setOptions(opts: Partial<EscapeSettings>) {
    this.settings = { ...this.settings, ...opts };
  }

  private hexToRgb(hex: string): [number, number, number] {
    const clean = hex.replace("#", "");
    if (clean.length !== 6) {
      return [0, 0, 0];
    }

    const r = parseInt(clean.slice(0, 2), 16) / 255;
    const g = parseInt(clean.slice(2, 4), 16) / 255;
    const b = parseInt(clean.slice(4, 6), 16) / 255;

    return [r, g, b];
  }

  render(params: {
    canvas: HTMLCanvasElement;
    view: { centerX: number; centerY: number; scale: number };
  }) {
    const { canvas, view } = params;
    const gl = this.gl;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(this.program);

    gl.uniform2f(this.uResolution, canvas.width, canvas.height);
    gl.uniform2f(this.uCenter, view.centerX, view.centerY);
    gl.uniform1f(this.uScale, view.scale);
    gl.uniform1i(this.uMaxIter, Math.min(this.settings.iterations, 1000));
    gl.uniform1i(this.uPower, this.settings.power);
    gl.uniform1i(this.uType, this.settings.type === "mandelbrot" ? 0 : 1);
    gl.uniform2f(this.uJuliaC, this.settings.juliaRe, this.settings.juliaIm);

    gl.uniform3fv(this.uColorA, this.hexToRgb(this.settings.colorA));
    gl.uniform3fv(this.uColorB, this.hexToRgb(this.settings.colorB));
    gl.uniform3fv(
      this.uAttractorColor,
      this.hexToRgb(this.settings.attractorColor),
    );

    gl.uniform1i(this.uContourStep, this.settings.contourStep || 1);
    gl.uniform1i(this.uShowContours, this.settings.showContours ? 1 : 0);

    const posLoc = gl.getAttribLocation(this.program, "a_position");
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}
