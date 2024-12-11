"use client";

import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TableBody from "@mui/material/TableBody";
import UpdateModal from "./UpdateModal";
import ValueTableRows from "./ValueTableRows";
import ValueTableRow from "../atoms/ValueTableRow";
import HeaderTableRow from "../atoms/HeaderTableRow";
import SecondTable from "./SecondTable";

const CustomTableRow = ({ data, subDataTitle }) => {
  const [open, setOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleUpdateClick = (item) => {
    setSelectedItem(item);
    setUpdateModalOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateModalOpen(false);
    setSelectedItem(null);
  };

  const handleUpdate = (updatedData) => {
    console.log("Updated data:", updatedData);
    handleUpdateClose();
  };

  let firstDefinedElement = data.subData.filter(
    (item) => typeof item === "object" && item !== undefined
  )[0];

  const containSubdata = data.subData && data.subData.length > 0;

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            color={containSubdata ? "success" : "error"}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <ValueTableRow value={data} onUpdateClick={handleUpdateClick} />
      </TableRow>
      {subDataTitle && (
        <SecondTable open={open} subDataTitle={subDataTitle}>
          <HeaderTableRow data={firstDefinedElement || {}} />
          <TableBody>
            <ValueTableRows
              values={data.subData}
              onUpdateClick={handleUpdateClick}
            />
          </TableBody>
        </SecondTable>
      )}

      <UpdateModal
        open={updateModalOpen}
        handleClose={handleUpdateClose}
        data={selectedItem}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default CustomTableRow;
