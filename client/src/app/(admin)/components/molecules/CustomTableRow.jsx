"use client";

import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ValueTableRow from "@adminAto/ValueTableRow";
import SecondTable from "@adminOrg/SecondTable";
import axiosInstance from "@/config/axios";
import { snackbarState } from "@/store/atoms/snackbarAtom";
import { adminModalState } from "@/store/atoms/adminModalAtom";
import CollapseIcon from "@adminAto/CollapseIcon";
import { tablesAtom } from "@/store/atoms/tablesAtom";

const CustomTableRow = ({ data, tableKey, subDataTitle }) => {
  const [open, setOpen] = useState(false);
  const [AdminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const setSnackbar = useSetRecoilState(snackbarState);
  const setAdminModal = useSetRecoilState(adminModalState);
  const setTables = useSetRecoilState(tablesAtom);

  const handleUpdateClick = (item) => {
    setSelectedItem(item);
    setAdminModalOpen(true);
  };

  const handleUpdateClose = () => {
    setAdminModalOpen(false);
    setSelectedItem(null);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const path = `/${tableKey.split("/")[0]}/${data._id}`;
      await axiosInstance.put(path, updatedData);

      setTables((prev) => ({
        ...prev,
        [tableKey]: prev[tableKey].map((item) =>
          item._id === data._id ? { ...item, ...updatedData } : item
        ),
      }));

      setSnackbar({
        open: true,
        message: "Item updated successfully!",
        severity: "success",
      });
      handleUpdateClose();
    } catch (error) {
      console.error("Error updating item:", error);
      setSnackbar({
        message:
          error.customMessage || "Error updating item. Please try again.",
        severity: "error",
      });
      throw error;
    }
  };

  const handleDelete = async (_id) => {
    const key = tableKey.split("/")[0];

    const title = data.title || data.username || data._id;

    const isConfirmed = confirm(
      `Are you sure you want to delete this "${title}" ${key}?`
    );
    if (!isConfirmed) return;

    try {
      const path = `/${key}/${_id}`;
      await axiosInstance.delete(path);

      setTables((prev) => ({
        ...prev,
        [tableKey]: prev[tableKey].filter((item) => item._id !== _id),
      }));

      setSnackbar({
        open: true,
        message: "Item deleted successfully!",
        severity: "success",
      });
      handleUpdateClose();
    } catch (error) {
      console.error("Error deleting item:", error);
      setSnackbar({
        open: true,
        message:
          error.customMessage || "Error updating item. Please try again.",
        severity: "error",
      });
    }
  };

  let containSubdata;
  if (subDataTitle) containSubdata = data.subData && data.subData.length > 0;

  useEffect(() => {
    setAdminModal({
      open: AdminModalOpen,
      onClose: handleUpdateClose,
      onSubmit: handleUpdate,
      data: selectedItem,
      tableKey: tableKey,
      update: true,
    });
  }, [AdminModalOpen]);

  return (
    <>
      <TableRow hover={true}>
        {subDataTitle && (
          <TableCell>
            <CollapseIcon
              open={open}
              onClick={() => setOpen(!open)}
              color={containSubdata ? "success" : "error"}
            />
          </TableCell>
        )}
        <ValueTableRow
          values={data}
          onUpdateClick={handleUpdateClick}
          onDeleteClick={handleDelete}
        />
      </TableRow>
      {subDataTitle && (
        <SecondTable
          open={open}
          subDataTitle={subDataTitle}
          data={data.subData}
          onUpdateClick={handleUpdateClick}
        />
      )}
    </>
  );
};

export default CustomTableRow;
