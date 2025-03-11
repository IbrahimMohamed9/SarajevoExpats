import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";

const CustomCheckbox = ({
  fieldErrors,
  keyVal,
  formData,
  isRequired,
  handleChange,
}) => {
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
};

export default CustomCheckbox;
