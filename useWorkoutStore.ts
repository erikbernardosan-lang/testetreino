// arquivo: src/stores/useWorkoutStore.ts
import { create } from 'zustand';

interface WorkoutState {
  isTraining: boolean;
  currentExerciseIndex: number;
  currentSetIndex: number;
  isResting: boolean;
  timeLeft: number;
  worker: Worker | null;
  initWorkout: () => void;
  nextSet: (duration: number) => void;
  skipRest: () => void;
  stopWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  isTraining: false,
  currentExerciseIndex: 0,
  currentSetIndex: 1,
  isResting: false,
  timeLeft: 0,
  worker: null,

  initWorkout: () => {
    // Inicializa o Web Worker no lado do cliente
    if (typeof window !== 'undefined') {
      const worker = new Worker('/workers/timer.worker.ts');
      worker.onmessage = (e) => {
        if (e.data.type === 'TICK') set({ timeLeft: e.data.timeLeft });
        if (e.data.type === 'FINISHED') set({ isResting: false });
      };
      set({ isTraining: true, currentExerciseIndex: 0, currentSetIndex: 1, isResting: false, worker });
    }
  },

  nextSet: (restDuration: number) => {
    const { worker, currentSetIndex } = get();
    // Ativa o modo de descanso e dispara o worker de segundo plano
    set({ isResting: true, timeLeft: restDuration, currentSetIndex: currentSetIndex + 1 });
    worker?.postMessage({ action: 'start', duration: restDuration });
  },

  skipRest: () => {
    const { worker } = get();
    worker?.postMessage({ action: 'stop' });
    set({ isResting: false, timeLeft: 0 });
  },

  stopWorkout: () => {
    const { worker } = get();
    worker?.terminate();
    set({ isTraining: false, worker: null });
  }
}));
