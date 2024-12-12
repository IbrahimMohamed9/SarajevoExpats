"use client";

import { RecoilRoot } from "recoil";
import CustomeSnackbar from "@molecules/CustomeSnackbar";

const RecoilRootWrapper = ({ children }) => {
  return (
    <RecoilRoot>
      {children}
      <CustomeSnackbar />
    </RecoilRoot>
  );
};

export default RecoilRootWrapper;
