"use client";

import { atom } from "recoil";

export const loadingAtom = atom({
  key: "loadingState",
  default: false,
});
