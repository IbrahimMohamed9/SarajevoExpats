"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function UpdateModal({ open, handleClose, data, onUpdate }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onUpdate(formData);
    handleClose();
  };
  const ignoreKeys = [
    "_id",
    "subData",
    "createdAt",
    "updatedAt",
    "__v",
    "password",
  ];

  const textFieldsElements =
    data &&
    Object.entries(data).map(([key, value]) => {
      if (
        ignoreKeys.includes(key) ||
        Array.isArray(value) ||
        typeof value === "object"
      )
        return null;

      return (
        <TextField
          key={key}
          margin="dense"
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          type="text"
          fullWidth
          variant="outlined"
          name={key}
          value={formData[key] || ""}
          onChange={handleChange}
        />
      );
    });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update {data?.name}</DialogTitle>
      <DialogContent>{data && textFieldsElements}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
