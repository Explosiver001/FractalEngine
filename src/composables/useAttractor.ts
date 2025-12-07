import { reactive } from "vue";

export interface AttractorParams {
  a: number;
  b: number;
  c: number;
  d: number;
}

export interface AttractorState {
  params: AttractorParams;
  iterations: number;
  gamma: number;
  brightness: number;
}

const nicePresets: AttractorParams[] = [
  { a: 1.4,  b: -2.3, c: 2.4,  d: -2.1 },
  { a: -1.4, b: 1.6,  c: 1.0,  d: 0.7  },
  { a: -2.0, b: 0.9,  c: -0.9, d: -1.6 },
  { a: 1.3,  b: -1.9, c: 2.0,  d: -1.2 },
  { a: -1.3, b: 2.0,  c: -2.0, d: 0.6  }
];

function randomPreset(): AttractorParams {
  const idx = Math.floor(Math.random() * nicePresets.length);
  return { ...nicePresets[idx] };
}

export const attractorState = reactive<AttractorState>({
  params: randomPreset(),
  iterations: 250_000,
  gamma: 0.6,
  brightness: 1.5
});

export function useAttractor() {
  function setParams(p: Partial<AttractorParams>) {
    attractorState.params = { ...attractorState.params, ...p };
  }

  function rerollParams() {
    attractorState.params = randomPreset();
  }

  return {
    state: attractorState,
    setParams,
    rerollParams
  };
}
