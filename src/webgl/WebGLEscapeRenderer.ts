import { createProgram, createFullscreenQuad } from "./glUtils";
import { escapeVS, escapeFS } from "./shadersEscape";

export type EscapeType = "mandelbrot" | "julia";
export type EscapePalette = "classic" | "fire" | "pastel";

export interface EscapeSettings {
  type: EscapeType;
  iterations: number;
  power: number;
  palette: EscapePalette;
  juliaRe: number;
  juliaIm: number;
  showContours: boolean;
  contourStep: number;
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
  private uPalette: WebGLUniformLocation | null;
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
    this.uPalette = gl.getUniformLocation(this.program, "u_palette");
    this.uShowContours = gl.getUniformLocation(this.program, "u_showContours");
    this.uContourStep = gl.getUniformLocation(this.program, "u_contourStep");

    this.settings = {
      type: "mandelbrot",
      iterations: 200,
      power: 2,
      palette: "classic",
      juliaRe: -0.4,
      juliaIm: 0.6,
      showContours: true,
      contourStep: 5
    };
  }

  setOptions(opts: Partial<EscapeSettings>) {
    this.settings = { ...this.settings, ...opts };
  }

  render(params: { canvas: HTMLCanvasElement; view: { centerX: number; centerY: number; scale: number } }) {
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

    const paletteIndex =
      this.settings.palette === "fire" ? 1 :
      this.settings.palette === "pastel" ? 2 : 0;
    gl.uniform1i(this.uPalette, paletteIndex);

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
