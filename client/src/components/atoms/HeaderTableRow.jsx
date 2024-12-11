"use client";

import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function HeaderTableRow({ data, includeEmpty = false }) {
  const headerCells = Object.entries(data).map(([key, value]) => {
    if (
      key === "subData" ||
      typeof value === "object" ||
      key === "_id" ||
      key === "__v"
    ) {
      return null;
    }
    return <TableCell key={key}>{key}</TableCell>;
  });

  headerCells.push(<TableCell key="actions">Actions</TableCell>);
  if (includeEmpty) {
    headerCells.unshift(<TableCell key="empty"></TableCell>);
  }

  return (
    <TableHead>
      <TableRow>{headerCells}</TableRow>
    </TableHead>
  );
}
