"use client";

import { useRecoilState } from "recoil";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { snackbarState } from "@/store/atoms/snackbarAtom";

const CustomeSnackbar = () => {
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);

  const handleClose = () => {
    setSnackbar({
      open: false,
      message: "",
      severity: "success",
    });
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomeSnackbar;
