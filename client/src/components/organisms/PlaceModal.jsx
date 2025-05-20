"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { placeModalState } from "@/store/atoms/placeModalAtom";
import { snackbarState } from "@/store/atoms/snackbarAtom";
import axiosInstance from "@/config/axios";
import ImageUpload from "@/components/molecules/ImageUpload";

export default function PlaceModal() {
  const { open, onClose } = useRecoilValue(placeModalState);
  const setPlaceModal = useSetRecoilState(placeModalState);
  const setSnackbar = useSetRecoilState(snackbarState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [placeTypes, setPlaceTypes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "",
    phone: "",
    email: "",
    link: "",
    files: [],
  });
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (open) {
      fetchPlaceTypes();
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      type: "",
      phone: "",
      email: "",
      link: "",
      files: [],
    });
    setFieldErrors({});
    setError("");
  };

  const fetchPlaceTypes = async () => {
    try {
      const response = await axiosInstance.get("/placetypes");
      setPlaceTypes(response.data);
    } catch (error) {
      console.error("Error fetching place types:", error);
      setSnackbar({
        message: "Failed to load place types. Please try again later.",
        open: true,
        severity: "error",
      });
    }
  };

  const handleClose = useCallback(() => {
    setPlaceModal((prev) => ({
      ...prev,
      open: false,
    }));
    if (onClose) onClose();
  }, [onClose, setPlaceModal]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleFileChange = useCallback((files) => {
    setFormData((prev) => ({ ...prev, files }));
    setFieldErrors((prev) => ({ ...prev, files: "" }));
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    let isValid = true;

    // Required fields
    if (!formData.title || formData.title.trim() === "") {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!formData.content || formData.content.trim() === "") {
      errors.content = "Description is required";
      isValid = false;
    }

    if (!formData.type || formData.type.trim() === "") {
      errors.type = "Place type is required";
      isValid = false;
    }

    if (formData.files.length === 0) {
      errors.files = "At least one image is required";
      isValid = false;
    }

    // At least one contact method is required
    if (
      (!formData.phone || formData.phone.trim() === "") &&
      (!formData.email || formData.email.trim() === "") &&
      (!formData.link || formData.link.trim() === "")
    ) {
      errors.phone = "At least one contact method is required";
      errors.email = "At least one contact method is required";
      errors.link = "At least one contact method is required";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("content", formData.content);
        formDataToSend.append("type", formData.type);

        if (formData.phone) formDataToSend.append("phone", formData.phone);
        if (formData.email) formDataToSend.append("email", formData.email);
        if (formData.link) formDataToSend.append("link", formData.link);

        // Append files
        formData.files.forEach((file) => {
          formDataToSend.append("files", file);
        });

        const response = await axiosInstance.post(
          "/places/user-submit",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        handleClose();

        setSnackbar({
          message:
            "Place submitted successfully! It will be reviewed by our team.",
          open: true,
          severity: "success",
        });
      } catch (error) {
        console.error("Error submitting place:", error);
        setError(
          error?.response?.data?.message ||
            error?.message ||
            "An error occurred while submitting the place"
        );

        setSnackbar({
          message: "Failed to submit place. Please try again later.",
          open: true,
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [formData, validateForm, handleClose, setSnackbar]
  );

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: "max-h-[90vh]",
      }}
    >
      <DialogTitle className="pb-4 bg-gradient-to-r from-orange-50 to-amber-50">
        Submit a Place
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
          <div className="mb-4">
            <p className="text-gray-600 mb-2">
              Share your favorite place in Sarajevo with the community! Fill out
              the form below to submit a new place.
            </p>
            <p className="text-sm text-gray-500 italic mb-4">
              Note: Your submission will be reviewed by our team before being
              published.
            </p>
          </div>

          <TextField
            fullWidth
            margin="dense"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            error={Boolean(fieldErrors.title)}
            helperText={fieldErrors.title || ""}
            InputLabelProps={{
              className: "text-black opacity-70",
            }}
          />

          <TextField
            fullWidth
            margin="dense"
            label="Description"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            multiline
            rows={4}
            error={Boolean(fieldErrors.content)}
            helperText={fieldErrors.content || ""}
            InputLabelProps={{
              className: "text-black opacity-70",
            }}
          />

          <FormControl
            fullWidth
            margin="dense"
            error={Boolean(fieldErrors.type)}
          >
            <InputLabel id="place-type-label">Place Type</InputLabel>
            <Select
              labelId="place-type-label"
              name="type"
              value={formData.type}
              onChange={handleChange}
              label="Place Type"
              required
            >
              {placeTypes.map((type) => (
                <MenuItem key={type._id} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
            {fieldErrors.type && (
              <FormHelperText>{fieldErrors.type}</FormHelperText>
            )}
          </FormControl>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextField
              fullWidth
              margin="dense"
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={Boolean(fieldErrors.phone)}
              helperText={fieldErrors.phone || ""}
              InputLabelProps={{
                className: "text-black opacity-70",
              }}
            />

            <TextField
              fullWidth
              margin="dense"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(fieldErrors.email)}
              helperText={fieldErrors.email || ""}
              InputLabelProps={{
                className: "text-black opacity-70",
              }}
            />

            <TextField
              fullWidth
              margin="dense"
              label="Website/Social Media Link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              error={Boolean(fieldErrors.link)}
              helperText={fieldErrors.link || ""}
              InputLabelProps={{
                className: "text-black opacity-70",
              }}
            />
          </div>

          <div className="mt-4">
            <ImageUpload
              files={formData.files}
              onChange={handleFileChange}
              error={fieldErrors.files}
            />
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>
      </DialogContent>
      <DialogActions className="px-4 pb-4">
        <Button
          onClick={handleClose}
          style={{ backgroundColor: "#CCC" }}
          className="text-gray-800 bg-gray-300 hover:bg-gray-400"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          className="bg-main hover:bg-tertiary"
        >
          {loading ? (
            <div className="flex items-center">
              <CircularProgress size={20} color="inherit" className="mr-2" />
              Submitting...
            </div>
          ) : (
            "Submit Place"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
