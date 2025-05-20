import { atom } from "recoil";

export const placeModalState = atom({
  key: "placeModalState",
  default: {
    open: false,
    onClose: () => {},
    onSubmit: () => {},
  },
});
