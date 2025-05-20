"use client";

import { useState, useCallback } from "react";
import { Button, Typography, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

const ImageUpload = ({ files = [], onChange, error, maxFiles = 20 }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const newFiles = Array.from(e.dataTransfer.files);
        const validFiles = newFiles.filter((file) =>
          file.type.startsWith("image/")
        );

        if (files.length + validFiles.length > maxFiles) {
          alert(`You can upload a maximum of ${maxFiles} images`);
          return;
        }
        
        // Validate file size (max 5MB per image)
        const invalidSizeFiles = validFiles.filter(file => file.size > 5 * 1024 * 1024);
        if (invalidSizeFiles.length > 0) {
          alert(`Some images exceed the maximum size of 5MB. Please compress your images.`);
          return;
        }

        onChange([...files, ...validFiles]);
      }
    },
    [files, onChange, maxFiles]
  );

  const handleChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const newFiles = Array.from(e.target.files);

        if (files.length + newFiles.length > maxFiles) {
          alert(`You can upload a maximum of ${maxFiles} images`);
          return;
        }
        
        // Validate file size (max 5MB per image)
        const invalidSizeFiles = newFiles.filter(file => file.size > 5 * 1024 * 1024);
        if (invalidSizeFiles.length > 0) {
          alert(`Some images exceed the maximum size of 5MB. Please compress your images.`);
          return;
        }

        onChange([...files, ...newFiles]);
      }
    },
    [files, onChange, maxFiles]
  );

  const handleRemove = useCallback(
    (index) => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      onChange(newFiles);
    },
    [files, onChange]
  );

  return (
    <div className="space-y-4">
      <Typography variant="subtitle1" className="font-medium">
        Upload Images <span className="text-red-500">*</span>
      </Typography>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? "border-main bg-orange-50"
            : error
            ? "border-red-500"
            : "border-gray-300"
        }`}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <CloudUploadIcon className="text-5xl text-gray-400 mb-2" />
          <Typography variant="body1" className="mb-1">
            Drag and drop images here or click to browse
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            Supported formats: JPG, PNG, GIF (Max {maxFiles} images, 5MB per image)
          </Typography>
          <Button
            variant="contained"
            component="span"
            className="mt-4 bg-main hover:bg-tertiary"
          >
            Select Files
          </Button>
        </label>
      </div>

      {error && (
        <Typography variant="caption" className="text-red-500">
          {error}
        </Typography>
      )}

      {files.length > 0 && (
        <div>
          <Typography variant="subtitle2" className="mb-2">
            Selected Images ({files.length}/{maxFiles})
          </Typography>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                  <div className="relative w-full h-24">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-70 hover:opacity-100 transition-opacity"
                >
                  <DeleteIcon fontSize="small" className="text-red-500" />
                </button>
                <Typography variant="caption" className="block truncate mt-1">
                  {file.name}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
