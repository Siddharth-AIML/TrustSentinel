import { create } from "zustand";

interface LoaderStore {
  analysisLoader: boolean;
  setAnalysisLoader: (value: boolean) => void;
}

const useLoaderStore = create<LoaderStore>((set) => ({
  analysisLoader: false,
  setAnalysisLoader: (value: boolean) => set({ analysisLoader: value }),
}));

export default useLoaderStore;
