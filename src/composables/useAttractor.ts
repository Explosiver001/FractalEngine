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

function randomPreset(): AttractorParams {
  return {
    a: Math.random() * 2,
    b: (Math.random() - 0.5) * 5,
    c: (Math.random() - 0.5) * 5,
    d: (Math.random() - 0.5) * 5,
  } as AttractorParams;
}

export const attractorState = reactive<AttractorState>({
  params: randomPreset(),
  iterations: 250_000,
  gamma: 0.6,
  brightness: 1.5,
});

export function useAttractor() {
  function setParams(p: Partial<AttractorParams>) {
    const current = attractorState.params;
    const next = { ...current, ...p };

    // Check if any value changed
    const changed = Object.keys(next).some(
      (key) =>
        next[key as keyof AttractorParams] !==
        current[key as keyof AttractorParams],
    );

    if (changed) {
      attractorState.params = next;
    }
  }

  function rerollParams() {
    attractorState.params = randomPreset();
  }

  return {
    state: attractorState,
    setParams,
    rerollParams,
  };
}
