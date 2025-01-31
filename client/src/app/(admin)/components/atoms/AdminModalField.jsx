"use client";

import {
  Button,
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import axiosInstance from "@/config/axios";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState, useCallback, memo } from "react";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const ImageGallery = dynamic(() => import("@molecules/ImageGallery"), {
  ssr: false,
});

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

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "clean"],
  ],
  clipboard: {
    matchVisual: false, // Prevents Quill from using deprecated mutation events
  },
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
];

const AdminModalField = memo(
  ({
    keyVal,
    formData,
    handleChange,
    title,
    requiredFields,
    fieldErrors,
    loading,
    error,
    setError,
    setLoading,
    setFieldErrors,
    setSnackbar,
    tables,
  }) => {
    const lowerKey = keyVal.toLowerCase();

    const isRequired =
      (title && requiredFields[title]?.includes(keyVal)) || false;
    const isTextArea = [
      "description",
      "content",
      "picturedescription",
      "text",
      "question",
      "answer",
    ].includes(lowerKey);

    const isDropList = ["type", "serviceType"].includes(keyVal);
    const isCheckbox = ["pinned", "showInSlider"].includes(keyVal);
    const isImages = ["childPosts"].includes(keyVal);
    const isNumber = ["priority", "slidePriority"].includes(keyVal);

    const handleImageChange = useCallback(
      async (e) => {
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

          const response = await axiosInstance.post(
            "/upload",
            imageForm,
            config
          );
          const imageUrl = response.data.url;

          handleChange("picture", imageUrl);
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
      },
      [handleChange, setError, setFieldErrors, setLoading, setSnackbar]
    );

    const [childPosts, setChildPosts] = useState([]);

    useEffect(() => {
      setChildPosts(formData?.childPosts || []);
      return () => setChildPosts([]);
    }, [formData?.childPosts]);

    const deleteImage = useCallback(
      (media) => {
        const isConfirmed = confirm(`Are you sure you want to delete this image?
            image url: ${media.displayUrl}`);

        if (isConfirmed) {
          axiosInstance
            .delete(`events/delete-image/${formData._id}`, {
              data: { displayUrl: media.displayUrl },
            })
            .then(() => {
              setChildPosts((prev) =>
                prev.filter((post) => post.displayUrl !== media.displayUrl)
              );
              setSnackbar({
                open: true,
                message: `Image deleted successfully`,
                severity: "success",
              });
            });
        }
      },
      [formData?._id, setSnackbar]
    );

    if (isDropList) {
      const tableKey = {
        type: "placeTypes/with-places",
        servicetype: "serviceTypes/with-services",
      };
      if (!tables[tableKey[lowerKey]]) {
        setSnackbar({
          message: `Please add ${keyVal} first`,
          open: true,
          severity: "error",
        });
        return null;
      }
      return (
        <FormControl
          key={keyVal}
          fullWidth
          sx={{ mt: 2 }}
          error={!!fieldErrors[keyVal]}
        >
          <InputLabel id={`${keyVal}-label`}>
            {keyVal.charAt(0).toUpperCase() + keyVal.slice(1)}
          </InputLabel>
          <Select
            labelId={`${keyVal}-label`}
            id={keyVal}
            name={keyVal}
            value={formData[keyVal] || ""}
            onChange={(e) => handleChange(keyVal, e.target.value)}
            label={keyVal.charAt(0).toUpperCase() + keyVal.slice(1)}
            required={Boolean(isRequired)}
          >
            {tables[tableKey[lowerKey]].map((option) => (
              <MenuItem key={option._id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          {fieldErrors[keyVal] && (
            <FormHelperText>{fieldErrors[keyVal]}</FormHelperText>
          )}
        </FormControl>
      );
    }

    if (isTextArea) {
      return (
        <div key={keyVal} className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {keyVal.charAt(0).toUpperCase() + keyVal.slice(1)}
            {isRequired && " *"}
          </label>
          <ReactQuill
            value={formData[keyVal] || ""}
            onChange={(content) => handleChange(keyVal, content)}
            modules={quillModules}
            formats={quillFormats}
            theme="snow"
            placeholder="Write something here..."
            className={`border rounded-md shadow-sm ${
              fieldErrors[keyVal] ? "border-red-500" : ""
            }`}
          />
          {fieldErrors[keyVal] && (
            <Typography color="error" variant="caption" display="block">
              {fieldErrors[keyVal]}
            </Typography>
          )}
        </div>
      );
    }

    if (keyVal === "picture") {
      return (
        <Box key={keyVal} className="mb-6">
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            className={`${
              fieldErrors[keyVal] ? "bg-red-500" : "bg-main"
            } hover:bg-main/90 mb-2 w-full`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Image"}
            {isRequired && " *"}
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={Boolean(isRequired)}
            />
          </Button>
          {(error || fieldErrors[keyVal]) && (
            <Typography color="error" variant="caption" display="block">
              {fieldErrors[keyVal] || error}
            </Typography>
          )}
          {formData[keyVal]?.includes("http") && (
            <Box className="relative w-full h-48 mt-2 rounded-lg overflow-hidden">
              <Image
                src={formData[keyVal]}
                alt="Preview"
                fill
                className="object-cover"
              />
            </Box>
          )}
        </Box>
      );
    }

    if (isCheckbox) {
      return (
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            sx={{
              "& .MuiFormControlLabel-label": {
                ml: 1,
                fontSize: "0.95rem",
                fontWeight: 500,
                color: fieldErrors[keyVal] ? "error.main" : "text.primary",
                textTransform: "capitalize",
              },
            }}
            control={
              <Checkbox
                checked={Boolean(formData[keyVal])}
                onChange={(e) => handleChange(keyVal, e.target.checked)}
                sx={{
                  color: "grey.400",
                  padding: "6px",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 112, 3, 0.04)",
                  },
                  "&.Mui-checked": {
                    color: "#ff7003",
                    "&:hover": {
                      backgroundColor: "rgba(255, 112, 3, 0.04)",
                    },
                  },
                  "&.Mui-focusVisible": {
                    outline: "2px solid rgba(255, 112, 3, 0.2)",
                    outlineOffset: "2px",
                  },
                }}
              />
            }
            label={
              <Box component="span">
                {keyVal.replace(/_/g, " ")}
                {Boolean(isRequired) && (
                  <Box
                    component="span"
                    sx={{
                      ml: 0.5,
                      color: "error.main",
                      fontWeight: 500,
                    }}
                  >
                    *
                  </Box>
                )}
              </Box>
            }
          />
          {fieldErrors[keyVal] && (
            <Typography
              variant="caption"
              sx={{
                display: "block",
                ml: 4,
                mt: 0.5,
                color: "error.main",
              }}
            >
              {fieldErrors[keyVal]}
            </Typography>
          )}
        </Box>
      );
    }

    if (isImages) {
      return (
        <ImageGallery
          childPosts={childPosts}
          adminModal={false}
          onClick={deleteImage}
        />
      );
    }

    const type = isNumber ? "number" : "text";
    return (
      <TextField
        key={keyVal}
        type={type}
        fullWidth
        label={keyVal.charAt(0).toUpperCase() + keyVal.slice(1)}
        name={keyVal}
        value={formData[keyVal]}
        onChange={(e) => handleChange(keyVal, e.target.value)}
        variant="outlined"
        className="mb-4"
        required={Boolean(isRequired)}
        error={!!fieldErrors[keyVal]}
        helperText={fieldErrors[keyVal]}
      />
    );
  }
);

AdminModalField.displayName = "AdminModalField";

export default AdminModalField;
