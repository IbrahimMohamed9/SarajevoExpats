"use client";

import { Button, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ReorderIcon from "@mui/icons-material/Reorder";
import CheckIcon from "@mui/icons-material/Check";
import axiosInstance from "@/config/axios";
import { useCallback, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { imageDialogState } from "@/recoil/imageDialog";
import { loadingAtom } from "@/store/atoms/loadingAtom";
import { snackbarState } from "@/store/atoms/snackbarAtom";
import { errorAtom, fieldErrorsAtom } from "@/store/atoms/formAtoms";
import { styled } from "@mui/material/styles";
import ImageGallery from "@/components/molecules/ImageGallery";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

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

const ImagesField = ({
  keyVal,
  fieldErrors,
  isRequired,
  formData,
  handleChange,
  isPhoto = false,
}) => {
  const [reordering, setReordering] = useState(false);
  const setImageDialog = useSetRecoilState(imageDialogState);
  const loading = useRecoilValue(loadingAtom);
  const setLoading = useSetRecoilState(loadingAtom);
  const setSnackbar = useSetRecoilState(snackbarState);
  const error = useRecoilValue(errorAtom);
  const setError = useSetRecoilState(errorAtom);
  const setFieldErrors = useSetRecoilState(fieldErrorsAtom);

  let currentType = window.location.href.split("/");
  currentType = currentType[currentType.length - 1];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

        const response = await axiosInstance.post("/upload", imageForm, config);
        const imageUrl = response.data.url;

        // Add to existing images
        let updatedImages = [...(formData[keyVal] || []), imageUrl];

        if (isPhoto) updatedImages = imageUrl;

        handleChange(keyVal, updatedImages, false);

        setFieldErrors((prev) => ({ ...prev, [keyVal]: "" }));
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
    [
      handleChange,
      setError,
      setFieldErrors,
      setLoading,
      setSnackbar,
      formData,
      keyVal,
    ]
  );

  const handleImageClick = (image) => {
    // Open the image dialog with Recoil
    if (reordering) return; // Don't open dialog when reordering

    setImageDialog({
      open: true,
      image,
      onDelete: handleDeleteImage,
      loading: false,
    });
  };

  const handleDeleteImage = async (selectedImage) => {
    try {
      setLoading(true);

      const imageUrl = selectedImage?.displayUrl || selectedImage;

      const response = await axiosInstance.delete(
        `/${currentType}/${formData._id}/images`,
        {
          data: {
            imageUrl: imageUrl,
          },
        }
      );

      const updatedImages = (formData[keyVal] || []).filter(
        (img) =>
          (img?.displayUrl || img) !==
          (selectedImage?.displayUrl || selectedImage)
      );
      handleChange(keyVal, updatedImages, false);

      setSnackbar({
        message: "Image deleted successfully",
        open: true,
        severity: "success",
      });

      return true;
    } catch (error) {
      console.error("Error deleting image:", error);
      setSnackbar({
        message: error.response?.data?.message || "Failed to delete image",
        open: true,
        severity: "error",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event) => {
    if (event.active.id !== event.over?.id) {
      const items = formData[keyVal] || [];
      const oldIndex = items.findIndex(
        (item) => (item?.displayUrl || item) === event.active.id
      );
      const newIndex = items.findIndex(
        (item) => (item?.displayUrl || item) === event.over?.id
      );

      const reorderedImages = [...items];
      const [movedItem] = reorderedImages.splice(oldIndex, 1);
      reorderedImages.splice(newIndex, 0, movedItem);

      handleChange(keyVal, reorderedImages, false);
    }
  };

  const handleDragBtnClick = async () => {
    const currentReorderingState = !reordering;
    setReordering(currentReorderingState);

    // Only submit the changes when clicking "Done" (finishing reordering)
    if (reordering) {
      try {
        const items = formData[keyVal] || [];

        await axiosInstance.put(
          `/${currentType}/${formData._id}/images/reorder`,
          {
            images: items.map((img) => img?.displayUrl || img),
          }
        );

        setSnackbar({
          message: "Images reordered successfully",
          open: true,
          severity: "success",
        });
      } catch (error) {
        console.error("Error reordering images:", error);
        setSnackbar({
          message:
            error.response?.data?.message || "Failed to update image order",
          open: true,
          severity: "error",
        });
      }
    }
  };

  return (
    <>
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
            disabled={reordering}
          />
        </Button>
        {(error || fieldErrors[keyVal]) && (
          <Typography color="error" variant="caption" display="block">
            {fieldErrors[keyVal] || error}
          </Typography>
        )}
      </Box>

      <div className="mt-0">
        {formData[keyVal]?.length > 1 && (
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-500">
              {reordering
                ? "Drag images to reorder them"
                : "Click on image to view. Use reorder button to change order."}
            </p>
            <Button
              variant="outlined"
              size="small"
              color={reordering ? "success" : "primary"}
              startIcon={reordering ? <CheckIcon /> : <ReorderIcon />}
              onClick={handleDragBtnClick}
              className="ml-2"
              disabled={loading}
            >
              {reordering ? "Done" : "Reorder"}
            </Button>
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={() => setReordering(true)}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={(formData[keyVal] || []).map((img) => img)}>
            <ImageGallery
              childPosts={formData[keyVal] || []}
              onClick={handleImageClick}
              adminModal={true}
              reordering={reordering}
            />
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
};

export default ImagesField;
