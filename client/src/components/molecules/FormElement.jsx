import DropList from "@atoms/DropList";
import { TextField } from "@mui/material";

const FormElement = ({ field }) => {
  const {
    name,
    label,
    type,
    multiline,
    rows,
    placeholder,
    items,
    required = false,
  } = field;

  if (type === "droplist") {
    return (
      <DropList items={items} label={label} name={name} required={required} />
    );
  }

  return (
    <div key={name} className="group">
      <TextField
        name={name}
        label={label}
        type={type}
        required={required}
        fullWidth
        multiline={multiline}
        rows={rows}
        placeholder={placeholder}
        className="transition-all duration-300 group-hover:-translate-y-1"
      />
    </div>
  );
};

export default FormElement;
