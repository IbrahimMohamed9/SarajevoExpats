"use client";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilState } from "recoil";
import { imageDialogState } from "@/recoil/imageDialog";

const ImagePreviewDialog = () => {
  const [dialogState, setDialogState] = useRecoilState(imageDialogState);
  const { open, image, onDelete, loading } = dialogState;

  const handleClose = () => {
    setDialogState({
      ...dialogState,
      open: false,
    });
  };

  const handleDelete = async () => {
    if (onDelete && image) {
      setDialogState({
        ...dialogState,
        loading: true,
      });

      try {
        await onDelete(image);
        
        // Close dialog after successful deletion
        setDialogState({
          open: false,
          image: null,
          onDelete: null,
          loading: false,
        });
      } catch (error) {
        console.error("Error deleting image:", error);
        
        setDialogState({
          ...dialogState,
          loading: false,
        });
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Image Preview
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {image && (
          <Box
            sx={{ position: "relative", width: "100%", paddingTop: "56.25%" }}
          >
            <img
              src={image?.displayUrl || image}
              alt="Selected image"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          disabled={loading}
        >
          Delete Image
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImagePreviewDialog;
