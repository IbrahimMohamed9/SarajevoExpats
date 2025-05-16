"use client";

import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";
import { getItemViewUrl, shouldShowViewButton } from "@/utils/navigation";

export default function ActionBtn({
  onDelete,
  onUpdate,
  onView,
  itemData,
  tableKey,
}) {
  const router = useRouter();

  // Use the utility functions from navigation.js

  const handleView = () => {
    if (onView) {
      onView(itemData);
    } else if (itemData && itemData._id) {
      const viewPath = getItemViewUrl(itemData, tableKey);
      router.push(viewPath);
    }
  };

  return (
    <div className="flex gap-2">
      {shouldShowViewButton(tableKey) && (
        <Tooltip title="View">
          <IconButton aria-label="view" color="info" onClick={handleView}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title="Edit">
        <IconButton aria-label="edit" color="primary" onClick={onUpdate}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete">
        <IconButton aria-label="delete" color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
