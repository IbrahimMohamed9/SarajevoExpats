"use client";

import { useState, useEffect } from "react";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

const CustomDatePicker = ({
  keyVal,
  isRequired,
  fieldErrors,
  formData,
  handleChange,
  className,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Initialize date from formData if available
  useEffect(() => {
    if (formData[keyVal]) {
      setSelectedDate(new Date(formData[keyVal]));
    }
  }, [formData, keyVal]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    handleChange(keyVal, newDate ? newDate.toISOString() : null);
  };

  return (
    <FormControl
      key={keyVal}
      fullWidth
      sx={{ mt: 2 }}
      error={!!fieldErrors[keyVal]}
      className={className}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Trip Date"
          value={selectedDate}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              variant: "outlined",
              required: Boolean(isRequired),
              error: !!fieldErrors[keyVal],
              fullWidth: true,
            },
          }}
        />
      </LocalizationProvider>
      {fieldErrors[keyVal] && (
        <FormHelperText>{fieldErrors[keyVal]}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomDatePicker;
