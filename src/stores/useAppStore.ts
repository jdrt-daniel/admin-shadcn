import { create } from "zustand";

type AppState = {
  moduleName: string;
};

type AppActions = {
  setModuleName: (moduleName: string) => void;
};

export const useAppStore = create<AppState & AppActions>()((set) => ({
  moduleName: "Dashboard",
  setModuleName: (moduleName) => set(() => ({ moduleName })),
}));
