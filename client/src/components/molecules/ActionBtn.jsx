"use client";

import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ActionBtn({ onDelete, onUpdate }) {
  return (
    <div className="flex gap-2">
      <Tooltip title="Delete">
        <IconButton aria-label="delete" color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit">
        <IconButton aria-label="edit" color="primary" onClick={onUpdate}>
          <EditIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
