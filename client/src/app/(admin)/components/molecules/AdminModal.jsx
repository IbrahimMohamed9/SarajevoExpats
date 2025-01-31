"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { snackbarState } from "@/store/atoms/snackbarAtom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { adminModalState } from "@/store/atoms/adminModalAtom";
import { tablesAtom } from "@/store/atoms/tablesAtom";
import AdminModalField from "@adminAto/AdminModalField";

// Define required fields for each table type
const requiredFields = {
  events: ["content", "displayUrl", "url", "date"],
  places: ["title", "content", "picture", "type", "link"],
  news: ["title", "content", "picture", "sources"],
  services: ["name", "content", "picture", "serviceType"],
  serviceTypes: ["name"],
  placeTypes: ["name"],
};

export default function AdminModal() {
  const info = useRecoilValue(adminModalState);
  const { open, onClose, data, onSubmit, tableKey, update } = info;
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const excludeFields = [
    "_id",
    "__v",
    "createdAt",
    "updatedAt",
    "subData",
    "date",
  ];
  const setSnackbar = useSetRecoilState(snackbarState);
  const title = tableKey?.split("/")[0] || "";
  const tables = useRecoilValue(tablesAtom);
  const keys = Object.keys(formData).filter(
    (key) => !excludeFields.includes(key)
  );

  useEffect(() => {
    setFormData(data || {});

    setFieldErrors({});

    return () => {
      setFormData({});
      setFieldErrors({});
      setError("");
    };
  }, [data, title]);

  const handleClose = useCallback(() => {
    setError("");
    setFieldErrors({});
    onClose();
  }, [onClose]);

  const handleChange = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: "" }));
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    let isValid = true;

    if (title && requiredFields[title]) {
      requiredFields[title].forEach((field) => {
        if (!formData[field] || formData[field].trim() === "") {
          errors[field] = `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } is required`;
          isValid = false;
        }
      });
    }

    setFieldErrors(errors);
    return isValid;
  }, [formData, title]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) {
        setSnackbar({
          message: "Please fill in all required fields",
          open: true,
          severity: "error",
        });
        return;
      }

      setLoading(true);
      setError("");

      try {
        if (!tableKey) {
          throw new Error("Table key is required");
        }

        const data = await onSubmit(formData);
        handleClose();

        setSnackbar({
          message: data.message,
          open: true,
          severity: "success",
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "An error occurred while saving"
        );
        setSnackbar({
          message: error.response?.data?.message || "Failed to save changes",
          open: true,
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [formData, tableKey, onSubmit, validateForm, handleClose, setSnackbar]
  );

  const formElements = useMemo(
    () =>
      keys.map((key) => (
        <AdminModalField
          key={key}
          keyVal={key}
          formData={formData}
          handleChange={handleChange}
          title={title}
          requiredFields={requiredFields}
          fieldErrors={fieldErrors}
          loading={loading}
          error={error}
          setError={setError}
          setLoading={setLoading}
          setFieldErrors={setFieldErrors}
          setSnackbar={setSnackbar}
          tables={tables}
        />
      )),
    [
      keys,
      formData,
      handleChange,
      title,
      fieldErrors,
      loading,
      error,
      setError,
      setLoading,
      setFieldErrors,
      setSnackbar,
      tables,
    ]
  );

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: "max-h-[90vh]",
      }}
    >
      <DialogTitle className="flex justify-between items-center">
        {`${update ? "Edit" : "Create"} ${
          title.charAt(0).toUpperCase() + title.slice(1)
        }`}
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formElements}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          className="bg-main hover:bg-main/90"
          disabled={loading}
        >
          {loading ? "Saving..." : update ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
