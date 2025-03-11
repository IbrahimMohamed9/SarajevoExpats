import { atom } from "recoil";

export const tablesAtom = atom({
  key: "tablesState",
  default: {
    usersType: [
      { name: "admin", _id: 1 },
      { name: "user", _id: 2 },
    ],
  },
});
