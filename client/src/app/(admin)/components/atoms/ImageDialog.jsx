"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, IconButton, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

const ImageDialog = ({ open, onClose, imageUrl }) => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleClose = () => {
    onClose();
    setZoom(1);
  };

  if (!imageUrl) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      fullScreen
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      PaperProps={{
        className: "bg-black/95 backdrop-blur-lg",
      }}
    >
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <IconButton
          onClick={handleZoomOut}
          disabled={zoom <= 0.5}
          className="!bg-white/90 hover:!bg-white disabled:!opacity-50 disabled:!cursor-not-allowed"
          size="medium"
        >
          <ZoomOutIcon />
        </IconButton>
        <IconButton
          onClick={handleZoomIn}
          disabled={zoom >= 3}
          className="!bg-white/90 hover:!bg-white disabled:!opacity-50 disabled:!cursor-not-allowed"
          size="medium"
        >
          <ZoomInIcon />
        </IconButton>
        <IconButton
          onClick={handleClose}
          className="!bg-white/90 hover:!bg-white"
          size="medium"
        >
          <CloseIcon />
        </IconButton>
      </div>

      <div className="w-screen h-screen flex items-center justify-center p-4">
        <div
          className={`relative w-full h-full ${
            zoom > 1 ? "cursor-move overflow-auto" : "overflow-hidden"
          }`}
        >
          <div
            className="absolute top-1/2 left-1/2 w-full h-full transition-transform duration-300 ease-out"
            style={{
              transform: `translate(-50%, -50%) scale(${zoom})`,
              transformOrigin: "center",
            }}
          >
            <Image
              src={imageUrl}
              alt="Full size image"
              fill
              className="object-contain"
              sizes="100vw"
              priority
              quality={100}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ImageDialog;
