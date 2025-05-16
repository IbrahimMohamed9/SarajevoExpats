import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMemo } from "react";
import {
  PREFERRED_FIELD_ORDER,
  IGNORED_FIELDS,
} from "@/constants/tableConstants";

export default function HeaderTableRow({
  data,
  subDataTitle = false,
  actions = true,
}) {
  // Create a consistent order of header cells with proper data-content attributes
  const headerEntries = useMemo(() => {
    // Filter out ignored keys and objects that aren't arrays
    const filteredEntries = Object.entries(data).filter(
      ([key, value]) =>
        !IGNORED_FIELDS.includes(key) &&
        !(typeof value === "object" && !Array.isArray(value))
    );

    return filteredEntries.sort((a, b) => {
      const indexA = PREFERRED_FIELD_ORDER.indexOf(a[0]);
      const indexB = PREFERRED_FIELD_ORDER.indexOf(b[0]);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      return a[0].localeCompare(b[0]);
    });
  }, [data]);

  const headerCells = headerEntries.map(([key]) => {
    // Format the header text to be more readable
    const formattedHeader = key
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .trim();

    return (
      <TableCell key={key} align="center" data-content={key}>
        {formattedHeader}
      </TableCell>
    );
  });

  if (actions) {
    headerCells.push(
      <TableCell key="actions" align="center" data-content="actions">
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
