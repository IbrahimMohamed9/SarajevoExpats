import { atom } from "recoil";

export const imageDialogState = atom({
  key: "imageDialogState",
  default: {
    open: false,
    image: null,
    onDelete: null,
    loading: false,
  },
});
