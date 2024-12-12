import { atom } from "recoil";

const navOpenAtom = atom({
  key: "navOpenState",
  default: false,
});

export default navOpenAtom;
