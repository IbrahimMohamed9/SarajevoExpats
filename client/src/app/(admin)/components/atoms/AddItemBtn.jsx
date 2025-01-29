"use client";

import { useSetRecoilState } from "recoil";
import { adminModalState } from "@/store/atoms/adminModalAtom";
import { snackbarState } from "@/store/atoms/snackbarAtom";
import { tablesAtom } from "@/store/atoms/tablesAtom";
import Button from "@mui/material/Button";
import axiosInstance from "@/config/axios";
import { Typography } from "@mui/material";

const AddItemBtn = ({ tableKey, data }) => {
  const selectedItem = data;
  const setAdminModal = useSetRecoilState(adminModalState);
  const setSnackbar = useSetRecoilState(snackbarState);
  const setTables = useSetRecoilState(tablesAtom);

  const title = tableKey.split("/")[0];
  let titleWithoutS = title;

  if (!(title === "news") && title.endsWith("s"))
    titleWithoutS = title.slice(0, -1);

  const handleClose = () => {
    setAdminModal({
      open: false,
    });
  };

  const handlePost = async (newData) => {
    try {
      const response = await axiosInstance.post(title, newData);
      const newItem = response.data[titleWithoutS];

      if (!newItem) {
        throw new Error("Invalid response format");
      }

      setTables((prev) => ({
        ...prev,
        [tableKey]: Array.isArray(prev[tableKey])
          ? [...prev[tableKey], newItem]
          : [newItem],
      }));

      setSnackbar({
        open: true,
        message: response.data.message,
        severity: "success",
      });

      return response.data;
    } catch (error) {
      console.error("Error in handlePost:", error);
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message || error.message || "An error occurred",
        severity: "error",
      });
    }
  };

  const handleClick = () => {
    setAdminModal({
      open: true,
      onClose: handleClose,
      data: selectedItem,
      onSubmit: handlePost,
      tableKey,
      update: false,
    });
  };

  return (
    <div className="flex justify-between">
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Button
        variant="contained"
        className="bg-main mb-2"
        onClick={handleClick}
      >
        Add {title}
      </Button>
    </div>
  );
};

export default AddItemBtn;
