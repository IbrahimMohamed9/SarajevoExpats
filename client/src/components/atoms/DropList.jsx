"use client";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const DropList = ({ items, label, name, required }) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const itemsElement = items.map((item) => (
    <MenuItem key={item} value={item} className="flex items-center gap-2">
      {item}
    </MenuItem>
  ));

  return (
    <div
      className={`duration-300 ${
        !isOpen ? "transition-transform hover:-translate-y-1" : ""
      }`}
    >
      <FormControl fullWidth>
        <InputLabel
          id={`${name}-label`}
          className="bg-white px-2 rounded text-gray-600 font-medium"
        >
          {label} {required && "*"}
        </InputLabel>
        <Select
          labelId={`${name}-label`}
          value={value}
          label={label}
          onChange={(e) => setValue(e.target.value)}
          required
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          className="MuiSelect-root"
        >
          {itemsElement}
        </Select>
      </FormControl>
    </div>
  );
};

export default DropList;
