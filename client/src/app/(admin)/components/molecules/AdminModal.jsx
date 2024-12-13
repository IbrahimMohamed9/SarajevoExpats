"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import axiosInstance from "@/config/axios";
import { snackbarState } from "@/store/atoms/snackbarAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { adminModalState } from "@/store/atoms/adminModalAtom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// Define required fields for each table type
const requiredFields = {
  events: ["title", "content", "picture", "url"],
  places: ["title", "content", "picture", "type"],
  news: ["title", "content", "picture", "sources"],
  services: ["name", "content", "picture", "serviceSubtype"],
  serviceTypes: ["name"],
  serviceSubtypes: ["name", "serviceType"],
  placeTypes: ["name"],
};

export default function AdminModal() {
  const [info, setInfo] = useRecoilState(adminModalState);
  const { open, onClose, data, onSubmit, tableKey, update } = info;
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const excludeFields = ["_id", "__v", "createdAt", "updatedAt", "subData"];
  const setSnackbar = useSetRecoilState(snackbarState);
  const title = tableKey?.split("/")[0] || "";

  useEffect(() => {
    setFormData(data || {});

    setFieldErrors({});
  }, [data, title]);

  const handleClose = () => {
    setError("");
    setFieldErrors({});
    onClose();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 0.5 * 1024 * 1024 * 1024) {
      setError("File size should be less than 0.5GB");
      return;
    }

    try {
      setLoading(true);
      const imageForm = new FormData();
      imageForm.append("file", file, file.name);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axiosInstance.post("/upload", imageForm, config);
      const imageUrl = response.data.url;

      setFormData((prev) => ({ ...prev, picture: imageUrl }));
      setFieldErrors((prev) => ({ ...prev, picture: "" }));
      setSnackbar({
        message: "Image uploaded successfully!",
        open: true,
        severity: "success",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Error uploading image"
      );
      setSnackbar({
        message: "Failed to upload image",
        open: true,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
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
  };

  const handleSubmit = async (e) => {
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

      await onSubmit(formData);
      handleClose();

      setSnackbar({
        message: `${title} ${update ? "updated" : "created"} successfully!`,
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
  };

  const getFieldElement = (key) => {
    if (excludeFields.includes(key)) return null;

    const isRequired = title && requiredFields[title]?.includes(key);
    const isTextArea = [
      "description",
      "content",
      "picturedescription",
      "text",
    ].includes(key.toLowerCase());

    if (isTextArea) {
      return (
        <div key={key} className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {key.charAt(0).toUpperCase() + key.slice(1)}
            {isRequired && " *"}
          </label>
          <TextareaAutosize
            className={`w-full p-3 border rounded-md shadow-sm resize-y ${
              fieldErrors[key] ? "border-red-500" : "border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500`}
            minRows={4}
            placeholder={`Enter ${key.toLowerCase()}...`}
            name={key}
            value={formData[key] || ""}
            onChange={handleChange}
            required={isRequired}
          />
          {fieldErrors[key] && (
            <Typography color="error" variant="caption" display="block">
              {fieldErrors[key]}
            </Typography>
          )}
        </div>
      );
    }

    if (key === "picture") {
      return (
        <Box key={key} className="mb-6">
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            className={`${
              fieldErrors[key] ? "bg-red-500" : "bg-main"
            } hover:bg-main/90 mb-2 w-full`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Image"}
            {isRequired && " *"}
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={isRequired}
            />
          </Button>
          {(error || fieldErrors[key]) && (
            <Typography color="error" variant="caption" display="block">
              {fieldErrors[key] || error}
            </Typography>
          )}
          {formData[key]?.includes("http") && (
            <Box className="relative w-full h-48 mt-2 rounded-lg overflow-hidden">
              <Image
                src={formData[key]}
                alt="Preview"
                fill
                className="object-cover"
              />
            </Box>
          )}
        </Box>
      );
    }

    return (
      <TextField
        key={key}
        fullWidth
        label={key.charAt(0).toUpperCase() + key.slice(1)}
        name={key}
        value={formData[key] || ""}
        onChange={handleChange}
        variant="outlined"
        className="mb-4"
        required={isRequired}
        error={!!fieldErrors[key]}
        helperText={fieldErrors[key]}
      />
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          {Object.keys(formData).map(getFieldElement)}
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
