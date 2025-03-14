import { Button, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axiosInstance from "@/config/axios";
import { useCallback } from "react";
import { styled } from "@mui/material/styles";
import ImageGallery from "@/components/molecules/ImageGallery";

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
  loading,
  setFieldErrors,
  setSnackbar,
  setLoading,
  error,
  setError,
}) => {
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

        handleChange("pictures", [imageUrl]);
        setFieldErrors((prev) => ({ ...prev, pictures: "" }));
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
          />
        </Button>
        {(error || fieldErrors[keyVal]) && (
          <Typography color="error" variant="caption" display="block">
            {fieldErrors[keyVal] || error}
          </Typography>
        )}
      </Box>
      <div className="mt-0">
        <ImageGallery
          childPosts={formData[keyVal]}
          // selectedMedia
          // onClick
          adminModal={true}
        />
      </div>
    </>
  );
};

export default ImagesField;
