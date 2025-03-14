import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function HeaderTableRow({
  data,
  subDataTitle = false,
  actions = true,
}) {
  const ignoreKeys = ["_id", "subData", "__v", "password"];

  const headerCells = Object.entries(data).map(([key, value]) => {
    if (
      ignoreKeys.includes(key) ||
      (typeof value === "object" && !Array.isArray(value))
    ) {
      return null;
    }
    return (
      <TableCell key={key} align="center">
        {key}
      </TableCell>
    );
  });

  if (actions) {
    headerCells.push(
      <TableCell key="actions" align="center">
        Actions
      </TableCell>
    );
  }

  if (subDataTitle) {
    headerCells.unshift(<TableCell key="empty"></TableCell>);
  }

  return (
    <TableHead>
      <TableRow>{headerCells}</TableRow>
    </TableHead>
  );
}
