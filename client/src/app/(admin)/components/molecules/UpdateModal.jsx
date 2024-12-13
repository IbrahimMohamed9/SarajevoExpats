"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
  TextField,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import axiosInstance from "@/config/axios";

const UpdateModal = ({ open, onClose, data, onUpdate, tableKey }) => {
  const [formData, setFormData] = useState(data || {});
  const [previewUrl, setPreviewUrl] = useState(data?.picture || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async () => {
    try {
      setError(null);
      if (!tableKey) {
        throw new Error("Table key is required");
      }

      if (data?._id) {
        await axiosInstance.put(`/${tableKey}/${data._id}`, formData);
      } else {
        await axiosInstance.post(`/${tableKey}`, formData);
      }
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Error submitting form"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (0.5GB limit)
    if (file.size > 0.5 * 1024 * 1024 * 1024) {
      setError("File size should be less than 0.5GB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    try {
      setError(null);
      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      setFormData((prev) => ({ ...prev, picture: response.data.url }));
      setPreviewUrl(URL.createObjectURL(file));
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Error uploading file. Please try again."
      );
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemovePicture = () => {
    setPreviewUrl(null);
    setFormData((prev) => ({ ...prev, picture: null }));
  };

  const excludedFields = ["_id", "createdAt", "updatedAt", "__v", "password"];

  const getFieldElement = (key) => {
    switch (key) {
      case "picture":
        return (
          <div key={key} className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Picture
            </label>
            <div className="flex flex-col gap-4">
              {error && (
                <Alert severity="error" onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}
              {previewUrl && (
                <div className="relative w-full h-48 group">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <IconButton
                      onClick={handleRemovePicture}
                      className="text-white hover:text-red-500"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              )}
              <div className="relative">
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={
                    isUploading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <CloudUploadIcon />
                    )
                  }
                  disabled={isUploading}
                  className="w-full"
                >
                  {isUploading
                    ? `Uploading... ${uploadProgress}%`
                    : previewUrl
                    ? "Change Picture"
                    : "Upload Picture"}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </Button>
                {isUploading && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "content":
      case "description":
      case "pictureDescription":
        return (
          <div key={key} className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <TextareaAutosize
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-y"
              minRows={4}
              placeholder={`Enter ${key.toLowerCase()}...`}
              name={key}
              value={formData[key] || ""}
              onChange={handleChange}
            />
          </div>
        );

      default:
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
    }
  };

  const textFieldsElements =
    data &&
    Object.entries(data).map(([key, value]) => {
      if (
        excludedFields.includes(key) ||
        (Array.isArray(value) &&
          value.length > 0 &&
          typeof value[0] === "object")
      )
        return null;

      return getFieldElement(key);
    });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {data?._id ? "Update" : "Create"} {tableKey?.slice(0, -1)}
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert
            severity="error"
            onClose={() => setError(null)}
            className="mb-4"
          >
            {error}
          </Alert>
        )}
        {textFieldsElements}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {data?._id ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;
