import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

const myStore = (set) => {
  return {
    theme: "black",
    CHANGE_THEME: () => {
      return set((state) => {
        if (state.theme === "white") {
          state.theme = "black";
        } else state.theme = "white";
      });
    },
  };
};

export const useThemeStore = create(devtools(immer(myStore)));
