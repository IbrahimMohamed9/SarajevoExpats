"use client";

import { TextField } from "@mui/material";
import { memo } from "react";
import ImagesField from "@adminAto/ImagesField";
import CustomTextarea from "@adminAto/CustomTextarea";
import CustomCheckbox from "@adminAto/CustomCheckbox";
import CustomDropList from "@adminAto/CustomDropList";
import { useRecoilValue } from "recoil";
import { fieldErrorsAtom } from "@/store/atoms/formAtoms";
import { tablesAtom } from "@/store/atoms/tablesAtom";

const AdminModalField = memo(
  ({ keyVal, formData, handleChange, title, requiredFields }) => {
    // Access state from Recoil instead of props
    const fieldErrors = useRecoilValue(fieldErrorsAtom);
    const tables = useRecoilValue(tablesAtom);

    const lowerKey = keyVal.toLowerCase();

    const isRequired =
      (title && requiredFields[title]?.includes(keyVal)) || false;
    const isTextarea = [
      "description",
      "content",
      "picturedescription",
      "text",
      "question",
      "answer",
    ].includes(lowerKey);

    const isDropList = ["type", "serviceType", "tags"].includes(keyVal);
    const isCheckbox = ["pinned", "showInSlider"].includes(keyVal);
    const isImages = ["childPosts", "pictures"].includes(keyVal);
    const isPhoto = ["photo", "picture"].includes(keyVal);
    const isNumber = ["priority", "slidePriority"].includes(keyVal);

    if (isDropList) {
      return (
        <CustomDropList
          keyVal={keyVal}
          lowerKey={lowerKey}
          isRequired={isRequired}
          fieldErrors={fieldErrors}
          formData={formData}
          handleChange={handleChange}
          tables={tables}
        />
      );
    }

    if (isTextarea) {
      return (
        <CustomTextarea
          keyVal={keyVal}
          isRequired={isRequired}
          fieldErrors={fieldErrors}
          handleChange={handleChange}
          formData={formData}
        />
      );
    }

    if (isImages) {
      return (
        <ImagesField
          handleChange={handleChange}
          keyVal={keyVal}
          isRequired={isRequired}
          fieldErrors={fieldErrors}
          formData={formData}
        />
      );
    }

    if (isPhoto) {
      return (
        <ImagesField
          handleChange={handleChange}
          keyVal={keyVal}
          isRequired={isRequired}
          fieldErrors={fieldErrors}
          formData={formData}
        />
      );
    }
    if (isCheckbox) {
      return (
        <CustomCheckbox
          fieldErrors={fieldErrors}
          keyVal={keyVal}
          formData={formData}
          isRequired={isRequired}
          handleChange={handleChange}
        />
      );
    }

    const type = isNumber ? "number" : "text";
    return (
      <TextField
        fullWidth
        margin="dense"
        label={keyVal.charAt(0).toUpperCase() + keyVal.slice(1)}
        name={keyVal}
        value={formData[keyVal] || ""}
        onChange={(e) => handleChange(keyVal, e.target.value)}
        required={isRequired}
        error={Boolean(fieldErrors[keyVal])}
        helperText={fieldErrors[keyVal] || ""}
        type={type}
        inputProps={{
          className: "text-black",
        }}
        InputLabelProps={{
          className: "text-black opacity-70",
        }}
      />
    );
  }
);

AdminModalField.displayName = "AdminModalField";

export default AdminModalField;
