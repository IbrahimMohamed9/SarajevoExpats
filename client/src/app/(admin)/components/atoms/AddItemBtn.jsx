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

  const getResponseKey = (title) => {
    if (title === "news") return "news";
    return title.endsWith("s") ? title.slice(0, -1) : title;
  };

  const handleUpdateClose = () => {
    setAdminModal({
      open: false,
    });
  };

  const handleUpdate = async (newData) => {
    try {
      const response = await axiosInstance.post(tableKey, newData);
      const newItem = response.data[getResponseKey(title)];

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
      console.error("Error in handleUpdate:", error);
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
      onClose: handleUpdateClose,
      data: selectedItem,
      onSubmit: handleUpdate,
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
        className="bg-main"
        onClick={handleClick}
        sx={{ mb: 2 }}
      >
        Add {title}
      </Button>
    </div>
  );
};

export default AddItemBtn;
