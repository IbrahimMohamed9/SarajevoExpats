import { atom } from "recoil";

export const loadingAtom = atom({
  key: "loadingState",
  default: {
    card: false,
    article: false,
  },
});
