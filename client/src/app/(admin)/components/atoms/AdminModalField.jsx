"use client";

import { TextField } from "@mui/material";
import axiosInstance from "@/config/axios";
import { useEffect, useState, useCallback, memo } from "react";
import ImagesField from "@adminAto/ImagesField";
import CustomTextarea from "@adminAto/CustomTextarea";
import CustomDropList from "@adminAto/CustomDropList";
import dynamic from "next/dynamic";

const ImageGallery = dynamic(() => import("@molecules/ImageGallery"), {
  ssr: false,
});

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
    const isTextarea = [
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
      return (
        <CustomDropList
          keyVal={keyVal}
          lowerKey={lowerKey}
          isRequired={isRequired}
          fieldErrors={fieldErrors}
          formData={formData}
          handleChange={handleChange}
          tables={tables}
        />
      );
    }

    if (isTextarea) {
      return (
        <CustomTextarea
          keyVal={keyVal}
          isRequired={isRequired}
          fieldErrors={fieldErrors}
          formData={formData}
        />
      );
    }

    if (keyVal === "picture") {
      return (
        <ImagesField
          handleChange={handleChange}
          loading={loading}
          setError={setError}
          setSnackbar={setSnackbar}
          setFieldErrors={setFieldErrors}
          keyVal={keyVal}
          isRequired={isRequired}
          fieldErrors={fieldErrors}
          setLoading={setLoading}
          error={error}
          formData={formData}
        />
      );
    }

    if (isCheckbox) {
      return (
        <CustomCheckbox
          fieldErrors={fieldErrors}
          keyVal={keyVal}
          formData={formData}
          isRequired={isRequired}
          handleChange={handleChange}
        />
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
