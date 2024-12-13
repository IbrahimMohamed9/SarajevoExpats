"use client";

import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function HeaderTableRow({ data, includeEmpty = false }) {
  const ignoreKeys = ["_id", "subData", "__v", "password"];

  const headerCells = Object.entries(data).map(([key, value]) => {
    if (ignoreKeys.includes(key) || typeof value === "object") {
      return null;
    }
    return (
      <TableCell key={key} align="center">
        {key}
      </TableCell>
    );
  });

  headerCells.push(
    <TableCell key="actions" align="center">
      Actions
    </TableCell>
  );
  if (includeEmpty) {
    headerCells.unshift(<TableCell key="empty"></TableCell>);
  }

  return (
    <TableHead>
      <TableRow>{headerCells}</TableRow>
    </TableHead>
  );
}
