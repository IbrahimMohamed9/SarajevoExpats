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
import { loadingAtom } from "@/store/atoms/loadingAtom";
import { errorAtom, fieldErrorsAtom } from "@/store/atoms/formAtoms";
import AdminModalField from "@adminMol/AdminModalField";

// Define required fields for each table type
const requiredFields = {
  events: ["url"],
  places: ["title", "content", "pictures", "type", "link"],
  news: ["title", "content", "pictures", "sources"],
  services: ["name", "content", "pictures", "serviceType"],
  serviceTypes: ["name"],
  placeTypes: ["name"],
  placeTags: ["type", "tag"],
  trips: ["title", "content", "pictures", "repeatAt"],
};

export default function AdminModal() {
  const info = useRecoilValue(adminModalState);
  const { open, onClose, data, onSubmit, tableKey, update } = info;
  const [formData, setFormData] = useState({});
  const setError = useSetRecoilState(errorAtom);
  const setFieldErrors = useSetRecoilState(fieldErrorsAtom);
  const setLoading = useSetRecoilState(loadingAtom);
  const loading = useRecoilValue(loadingAtom);
  const setSnackbar = useSetRecoilState(snackbarState);

  const excludeFields = [
    "_id",
    "__v",
    "createdAt",
    "updatedAt",
    "subData",
    "date",
  ];

  const title = tableKey?.split("/")[0] || "";
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
  }, [data, title, setFieldErrors, setError]);

  const handleClose = useCallback(() => {
    setError("");
    setFieldErrors({});
    onClose();
  }, [onClose, setError, setFieldErrors]);

  const handleChange = useCallback(
    (key, value, withPrev = true) => {
      setFormData((prev) => {
        if (!withPrev) {
          return {
            ...prev,
            [key]:
              Array.isArray(value) && Array.isArray(prev[key])
                ? [...value]
                : value,
          };
        }
        return {
          ...prev,
          [key]:
            Array.isArray(value) && Array.isArray(prev[key])
              ? [...prev[key], ...value]
              : value,
        };
      });

      setFieldErrors((prev) => ({ ...prev, [key]: "" }));
    },
    [setFieldErrors]
  );

  const validateForm = useCallback(() => {
    const errors = {};
    let isValid = true;

    if (title && requiredFields[title]) {
      requiredFields[title].forEach((field) => {
        const isEmptyArray =
          Array.isArray(formData[field]) && formData[field].length === 0;
        const isEmptyString =
          typeof formData[field] === "string" && formData[field].trim() === "";

        if (!formData[field] || isEmptyString || isEmptyArray) {
          errors[field] = `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } is required`;
          isValid = false;
        }
      });
    }

    if (
      title === "trips" &&
      formData.repeatAt === "One-time" &&
      !formData.tripDate
    ) {
      errors.tripDate = "Trip date is required for one-time trips";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  }, [formData, title, setFieldErrors]);

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

        const cleanFormData = { ...formData };
        excludeFields.forEach((field) => {
          delete cleanFormData[field];
        });

        const data = await onSubmit(cleanFormData);
        handleClose();

        setSnackbar({
          message: data.message,
          open: true,
          severity: "success",
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        setError(
          error?.response?.data?.message ||
            error?.message ||
            "An error occurred while saving"
        );
      } finally {
        setLoading(false);
      }
    },
    [
      formData,
      tableKey,
      onSubmit,
      validateForm,
      handleClose,
      setSnackbar,
      setLoading,
      setError,
    ]
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
        />
      )),
    [keys, formData, handleChange, title]
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
      <DialogTitle className="pb-4 bg-gray-100">
        {update ? "Edit" : "Add"} {title ? title.slice(0, -1) : "Item"}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {formElements}
        </form>
      </DialogContent>
      <DialogActions className="px-4 pb-4">
        <Button
          onClick={handleClose}
          style={{ backgroundColor: "#CCC" }}
          className="text-gray-800 bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
