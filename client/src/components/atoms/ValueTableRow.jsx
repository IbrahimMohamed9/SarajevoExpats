import TableCell from "@mui/material/TableCell";
import ActionBtn from "@molecules/ActionBtn";
import { formatDateTime } from "@/utils/formatters";

const ValueTableRow = ({ values, onUpdateClick, onDeleteClick }) => {
  const ignoreKeys = ["_id", "subData", "__v", "password"];
  const time = ["createdAt", "updatedAt"];
  const className =
    "max-w-20 overflow-hidden text-ellipsis text-wrap line-clamp-3 min-w-48";

  const cells = Object.entries(values).map(([key, val]) => {
    if (ignoreKeys.includes(key) || typeof val === "object") {
      return null;
    }
    const value = time.includes(key) ? formatDateTime(val) : val;

    return (
      <TableCell key={key} component="th" scope="row">
        <div className={className}>{value}</div>
      </TableCell>
    );
  });

  cells.push(
    <TableCell key="actions" align="center">
      <ActionBtn
        onDelete={() => onDeleteClick?.(values._id)}
        onUpdate={() => onUpdateClick?.(values)}
      />
    </TableCell>
  );

  return <>{cells}</>;
};

export default ValueTableRow;
