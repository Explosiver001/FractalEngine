export const escapeVS = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const escapeFS = `
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_center;
uniform float u_scale;
uniform int u_maxIter;
uniform int u_power;
uniform int u_type; // 0 = Mandelbrot, 1 = Julia
uniform vec2 u_juliaC;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec3 u_attractorColor;
uniform bool u_showContours;
uniform int u_contourStep;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.y / u_resolution.x;

  float vw = u_scale;
  float vh = vw * aspect;

  float minX = u_center.x - vw * 0.5;
  float maxX = u_center.x + vw * 0.5;
  float minY = u_center.y - vh * 0.5;
  float maxY = u_center.y + vh * 0.5;

  float x0 = minX + uv.x * (maxX - minX);
  float y0 = maxY - uv.y * (maxY - minY);

  float zx;
  float zy;
  float cx;
  float cy;

  if (u_type == 0) {
    zx = 0.0;
    zy = 0.0;
    cx = x0;
    cy = y0;
  } else {
    zx = x0;
    zy = y0;
    cx = u_juliaC.x;
    cy = u_juliaC.y;
  }

  int iter = 0;
  int maxIter = u_maxIter;

  const int HARD_MAX = 2000;

  for (int i = 0; i < HARD_MAX; i++) {
    if (i >= maxIter) {
      break;
    }

    float r = length(vec2(zx, zy));
    float theta = atan(zy, zx);

    float rp = pow(r, float(u_power));
    float ang = theta * float(u_power);

    float x = rp * cos(ang);
    float y = rp * sin(ang);

    zx = x + cx;
    zy = y + cy;

    if (zx*zx + zy*zy > 4.0) {
      iter = i;
      break;
    }

    iter = i;
  }

  if (iter >= maxIter) {
    gl_FragColor = vec4(u_attractorColor, 1.0);
    return;
  }

  if (u_showContours && u_contourStep > 0) {
    float imod = mod(float(iter), float(u_contourStep));
    if (imod < 0.5) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }
  }

  float t = float(iter) / float(maxIter);
  vec3 col = mix(u_colorA, u_colorB, t);
  gl_FragColor = vec4(col, 1.0);
}
`;
