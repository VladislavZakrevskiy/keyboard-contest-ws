import { create } from "zustand";
import { createSelectorHooks } from "auto-zustand-selectors-hook";
import { WaitState } from "@/components/WaitPanel";
let text =
  "Before we get to keyboard, please note that on modern devices there are other ways to “input something”. For instance, people use speech recognition (especially on mobile devices) or copy/paste with the mouse.";
text = text.toUpperCase();

interface IConstestPageStore {
  waitState: WaitState;
  currentText: string;
  testText: string;
  setWaitState: (state: WaitState) => void;
  addLetterCurrentText: (letter: string) => void;
  removeLastLetterCurrentText: () => void;
  setTestText: (testText: string) => void;
}

const ConstestPageStore = create<IConstestPageStore>((set) => ({
  waitState: WaitState.WAIT,
  currentText: "",
  testText: text,
  setWaitState: (waitState) => set(() => ({ waitState })),
  addLetterCurrentText: (letter) => set((state) => ({ ...state, currentText: state.currentText + letter })),
  removeLastLetterCurrentText: () =>
    set((state) => {
      const { currentText } = state;
      const currentTextArr = currentText.split("");
      currentTextArr.pop();
      return { ...state, currentText: currentTextArr.join("") };
    }),
  setTestText: (testText) => set(() => ({ testText })),
}));

export const useContestPageStore = createSelectorHooks(ConstestPageStore);
