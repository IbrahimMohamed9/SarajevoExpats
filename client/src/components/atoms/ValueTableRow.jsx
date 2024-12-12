import TableCell from "@mui/material/TableCell";
import ActionBtn from "../molecules/ActionBtn";
import { formatDateTime } from "@/utils/formatters";

export default function ValueTableRow({ value, onUpdateClick }) {
  const ignoreKeys = ["_id", "subData", "__v"];
  const className =
    "max-w-20 overflow-hidden text-ellipsis text-wrap line-clamp-3 min-w-48";

  const cells = Object.entries(value).map(([key, val]) => {
    if (ignoreKeys.includes(key) || typeof val === "object") {
      return null;
    }
    if (key === "createdAt" || key === "updatedAt") {
      return (
        <TableCell key={key} component="th" scope="row">
          <div className={className}>{formatDateTime(val)}</div>
        </TableCell>
      );
    }
    return (
      <TableCell key={key} component="th" scope="row">
        <div className={className}>{val}</div>
      </TableCell>
    );
  });

  cells.push(
    <TableCell key="actions" align="center">
      <ActionBtn
        onDelete={() => console.log(value._id)}
        onUpdate={() => onUpdateClick?.(value)}
      />
    </TableCell>
  );

  return <>{cells}</>;
}
