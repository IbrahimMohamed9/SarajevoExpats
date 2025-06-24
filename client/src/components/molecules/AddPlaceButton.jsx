"use client";

import { Fab, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSetRecoilState } from "recoil";
import { placeModalState } from "@/store/atoms/placeModalAtom";

const AddPlaceButton = ({ className = "" }) => {
  const setPlaceModal = useSetRecoilState(placeModalState);

  const handleOpenModal = () => {
    setPlaceModal({
      open: true,
      onClose: () => {
        setPlaceModal((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Tooltip title="Add New Place" placement="left">
      <Fab
        color="primary"
        aria-label="add place"
        onClick={handleOpenModal}
        className={`fixed bottom-6 right-6 z-50 bg-main hover:bg-tertiary transition-all duration-300 transform hover:-translate-y-1 hover:rotate-[5deg] ${className}`}
        sx={{
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          "&:hover": {
            boxShadow: "0 12px 20px rgba(0,0,0,0.25)",
          },
          width: isMobile ? 56 : 64,
          height: isMobile ? 56 : 64,
        }}
      >
        <AddIcon sx={{ fontSize: isMobile ? 24 : 28 }} />
      </Fab>
    </Tooltip>
  );
};

export default AddPlaceButton;
