// Parameter set for the attractor formulas.
export interface AttractorParams {
  a: number;
  b: number;
  c: number;
  d: number;
}

// Each formula maps a point to the next point in the attractor sequence.
export type AttractorFormula = (
  x: number,
  y: number,
  params: AttractorParams,
) => { x: number; y: number };

// Describes how to render and seed a specific attractor variant.
interface AttractorDefinition {
  title: string;
  formula: AttractorFormula;
  preset: () => AttractorParams;
}

// Helper to generate random coefficients within a range.
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const deJongPreset = () => ({
  a: Math.random() * 2,
  b: rand(-2.5, 2.5),
  c: rand(-2.5, 2.5),
  d: rand(-2.5, 2.5),
});

const wideTrigPreset = () => ({
  a: rand(-2, 2),
  b: rand(-3, 3),
  c: rand(-3, 3),
  d: rand(-3, 3),
});

// Collection of supported formulas along with their preset generators.
export const attractorDefinitions = {
  "peter-de-jong": {
    title: "Peter de Jong (sin - cos)",
    formula: (x, y, { a, b, c, d }) => ({
      x: Math.sin(a * y) - Math.cos(b * x),
      y: Math.sin(c * x) - Math.cos(d * y),
    }),
    preset: deJongPreset,
  },
  "peter-de-jong-plus": {
    title: "Peter de Jong (sin + cos)",
    formula: (x, y, { a, b, c, d }) => ({
      x: Math.sin(a * y) + Math.cos(b * x),
      y: Math.sin(c * x) + Math.cos(d * y),
    }),
    preset: wideTrigPreset,
  },
  "peter-de-jong-cos-sin": {
    title: "Peter de Jong (cos - sin)",
    formula: (x, y, { a, b, c, d }) => ({
      x: Math.cos(a * y) - Math.sin(b * x),
      y: Math.cos(c * x) - Math.sin(d * y),
    }),
    preset: wideTrigPreset,
  },
  "peter-de-jong-sin-only": {
    title: "Peter de Jong (all sine)",
    formula: (x, y, { a, b, c, d }) => ({
      x: Math.sin(a * y) - Math.sin(b * x),
      y: Math.sin(c * x) - Math.sin(d * y),
    }),
    preset: wideTrigPreset,
  },
  "generalized-trig": {
    title: "Generalized Trig Map",
    formula: (x, y, { a, b, c, d }) => ({
      x: Math.sin(a * y) + Math.sin(b * x),
      y: Math.cos(c * x) + Math.cos(d * y),
    }),
    preset: wideTrigPreset,
  },
  clifford: {
    title: "Clifford Attractor",
    formula: (x, y, { a, b, c, d }) => ({
      x: Math.sin(a * y) + c * Math.cos(a * x),
      y: Math.sin(b * x) + d * Math.cos(b * y),
    }),
    preset: () => ({
      a: rand(-1.5, 1.5),
      b: rand(-1.5, 1.5),
      c: rand(-1.5, 1.5),
      d: rand(-1.5, 1.5),
    }),
  },
} satisfies Record<string, AttractorDefinition>;

export type AttractorType = keyof typeof attractorDefinitions;

export interface AttractorState {
  type: AttractorType;
  params: AttractorParams;
  iterations: number;
  gamma: number;
  brightness: number;
  colorA: string;
  colorB: string;
}

// Get a new randomized parameter set for a given attractor type.
export function randomPreset(type: AttractorType): AttractorParams {
  return attractorDefinitions[type].preset();
}

// Default UI state used when the app first loads.
export function createDefaultAttractorState(): AttractorState {
  const defaultType: AttractorType = "peter-de-jong";
  return {
    type: defaultType,
    params: randomPreset(defaultType),
    iterations: 250_000,
    gamma: 0.6,
    brightness: 1.5,
    colorA: "#38bdf8",
    colorB: "#a855f7",
  };
}
