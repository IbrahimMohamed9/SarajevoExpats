import { atom } from "recoil";

export const adminModalState = atom({
  key: "adminModalState",
  default: {
    open: false,
    onClose: () => {},
    onSubmit: () => {},
    data: [],
    tableKey: " / /",
    update: false,
  },
});
