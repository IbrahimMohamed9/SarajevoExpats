"use client";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

export default function SecondTable({ open, subDataTitle, children }) {
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit className="bg-gray-300">
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              {subDataTitle}
            </Typography>
            <Table size="small" aria-label="purchases">
              {children}
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
