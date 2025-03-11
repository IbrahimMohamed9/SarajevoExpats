import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
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

  // Here is the rocoil keys to get the data for the dropdown
  const tableKey = {
    places: "placeTypes/with-places",
    services: "serviceTypes/with-services",
    users: "usersType",
  };
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
