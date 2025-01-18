import { atom } from "recoil";

export const loadingAtom = atom({
  key: "loadingState",
  default: {
    cards: false,
    article: false,
  },
});
