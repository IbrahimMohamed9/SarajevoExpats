import TableCell from "@mui/material/TableCell";
import ActionBtn from "../molecules/ActionBtn";
import { ignoreKeys } from "../../constants";

export default function ValueTableRow({ value, onUpdateClick }) {
  const cells = Object.entries(value).map(([key, val]) => {
    if (ignoreKeys.includes(key) || typeof val === "object") {
      return null;
    }
    return (
      <TableCell key={key} component="th" scope="row">
        {val}
      </TableCell>
    );
  });

  cells.push(
    <TableCell key="actions">
      <ActionBtn
        onDelete={() => console.log(value._id)}
        onUpdate={() => onUpdateClick?.(value)}
      />
    </TableCell>
  );

  return <>{cells}</>;
}
