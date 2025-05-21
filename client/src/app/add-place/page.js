"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  FormHelperText,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@/store/atoms/snackbarAtom";
import axiosInstance from "@/config/axios";
import ImageUpload from "@/components/molecules/ImageUpload";
import { useRouter } from "next/navigation";

export default function AddPlacePage() {
  const router = useRouter();
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
    fetchPlaceTypes();
  }, []);

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
        formDataToSend.append("phone", formData.phone || "");
        formDataToSend.append("email", formData.email || "");
        formDataToSend.append("link", formData.link || "");

        // Append each file to the FormData
        if (formData.files && formData.files.length > 0) {
          formData.files.forEach((file) => {
            if (file) {
              formDataToSend.append("files", file);
            }
          });
        }

        await axiosInstance.post("/places", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setSnackbar({
          message: "Place submitted successfully!",
          open: true,
          severity: "success",
        });

        resetForm();
        router.push("/");
      } catch (error) {
        console.error("Error submitting place:", error);
        setError(
          error.response?.data?.message ||
            "Failed to submit place. Please try again."
        );
        setSnackbar({
          message:
            error.response?.data?.message ||
            "Failed to submit place. Please try again.",
          open: true,
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [formData, validateForm, setSnackbar, router]
  );

  return (
    <Container maxWidth="md" className="py-8">
      <Paper elevation={3} className="p-6">
        <Typography variant="h4" component="h1" className="mb-6 text-center font-bold text-main">
          Add a New Place
        </Typography>
        
        <form onSubmit={handleSubmit}>
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

          <div className="flex justify-end gap-4 mt-6">
            <Button
              onClick={() => router.push("/")}
              style={{ backgroundColor: "#CCC" }}
              className="text-gray-800 bg-gray-300 hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
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
          </div>
        </form>
      </Paper>
    </Container>
  );
}
