import { atom } from "recoil";

export const fieldErrorsAtom = atom({
  key: "fieldErrorsState",
  default: {},
});

export const errorAtom = atom({
  key: "errorState",
  default: "",
});
