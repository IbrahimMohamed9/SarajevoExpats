import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Chip,
  Box,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { snackbarState } from "@/store/atoms/snackbarAtom";
import { useSetRecoilState } from "recoil";

const CustomDropList = ({
  keyVal,
  lowerKey,
  isRequired,
  fieldErrors,
  formData,
  handleChange,
  tables,
}) => {
  const pathname = usePathname().split("/")[2];
  const setSnackbar = useSetRecoilState(snackbarState);

  // Here is the recoil keys to get the data for the dropdown
  const tableKey = {
    places: "placeTypes/with-places",
    services: "serviceTypes/with-services",
    users: "usersType",
  };

  // Special handling for tags
  if (keyVal === "tags") {
    // For tags, filter by the current place type
    const placeType = formData.type;

    if (!tables["placeTags"]) {
      setSnackbar({
        message: "No tags available",
        open: true,
        severity: "error",
      });
      return null;
    }

    const filteredTags = placeType
      ? tables["placeTags"].filter((tag) => tag.type === placeType)
      : [];

    if (filteredTags.length === 0 && placeType) {
      setSnackbar({
        message: `No tags available for type: ${placeType}`,
        open: true,
        severity: "warning",
      });
    }

    return (
      <FormControl
        key={keyVal}
        fullWidth
        sx={{ mt: 2 }}
        error={!!fieldErrors[keyVal]}
      >
        <InputLabel id={`${keyVal}-label`}>
          {keyVal.charAt(0).toUpperCase() + keyVal.slice(1)}
        </InputLabel>
        <Select
          labelId={`${keyVal}-label`}
          id={keyVal}
          name={keyVal}
          multiple
          value={Array.isArray(formData[keyVal]) ? formData[keyVal] : []}
          onChange={(e) => handleChange(keyVal, e.target.value, false)}
          label={keyVal.charAt(0).toUpperCase() + keyVal.slice(1)}
          required={Boolean(isRequired)}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {filteredTags.map((option) => (
            <MenuItem key={option._id} value={option.tag}>
              {option.tag}
            </MenuItem>
          ))}
        </Select>
        {fieldErrors[keyVal] && (
          <FormHelperText>{fieldErrors[keyVal]}</FormHelperText>
        )}
      </FormControl>
    );
  }

  // Original implementation for type/serviceType
  if (!tables[tableKey[pathname]]) {
    console.log(lowerKey, tableKey[pathname]);

    setSnackbar({
      message: `Please add ${keyVal} first`,
      open: true,
      severity: "error",
    });
    return null;
  }

  return (
    <FormControl
      key={keyVal}
      fullWidth
      sx={{ mt: 2 }}
      error={!!fieldErrors[keyVal]}
    >
      <InputLabel id={`${keyVal}-label`}>
        {keyVal.charAt(0).toUpperCase() + keyVal.slice(1)}
      </InputLabel>
      <Select
        labelId={`${keyVal}-label`}
        id={keyVal}
        name={keyVal}
        value={formData[keyVal] || ""}
        onChange={(e) => handleChange(keyVal, e.target.value)}
        label={keyVal.charAt(0).toUpperCase() + keyVal.slice(1)}
        required={Boolean(isRequired)}
      >
        {tables[tableKey[pathname]].map((option) => (
          <MenuItem key={option._id} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      {fieldErrors[keyVal] && (
        <FormHelperText>{fieldErrors[keyVal]}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomDropList;
