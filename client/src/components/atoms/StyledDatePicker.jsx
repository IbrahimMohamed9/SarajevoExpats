import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const StyledDatePicker = ({
  value,
  onChange,
  disabled = false,
  shouldDisableDate,
  placeholder = "MM/DD/YYYY",
}) => {
  const handleDateChange = (newDate) => {
    if (newDate) {
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const day = String(newDate.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;

      onChange(dateString);
    } else {
      onChange(null);
    }
  };
  return (
    <div className="w-full">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disabled={disabled}
          value={value}
          onChange={handleDateChange}
          shouldDisableDate={shouldDisableDate}
          slotProps={{
            textField: {
              variant: "outlined",
              required: true,
              fullWidth: true,
              placeholder: placeholder,
              sx: {
                width: "100%",
                "& .MuiInputBase-root": {
                  height: "48px",
                  borderRadius: "9999px",
                  backgroundColor: "white",
                  color: "#6b7280",
                  border: "1px solid #e5e7eb",
                  paddingLeft: "8px",
                  "&:hover": {
                    borderColor: "#ff7003",
                  },
                  "&.Mui-focused": {
                    borderColor: "#ff7003",
                    boxShadow: "0 0 0 2px rgba(255, 112, 3, 0.2)",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },
            },
            inputAdornment: {
              position: "end",
            },
          }}
          components={{
            OpenPickerIcon: () => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            ),
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default StyledDatePicker;
