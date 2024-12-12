"use client";

import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import ValueTableRows from "@molecules/ValueTableRows";
import TableBody from "@mui/material/TableBody";
import HeaderTableRow from "@atoms/HeaderTableRow";

export default function SecondTable({
  open,
  subDataTitle,
  data,
  onUpdateClick,
}) {
  let firstDefinedElement;
  firstDefinedElement = data.filter(
    (item) => typeof item === "object" && item !== undefined
  )[0];

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          className="bg-gray-300"
        >
          <div>
            <Typography variant="h6" gutterBottom component="div">
              {subDataTitle}
            </Typography>
            <Table size="small" aria-label="purchases">
              <HeaderTableRow data={firstDefinedElement || {}} />
              <TableBody>
                <ValueTableRows values={data} onUpdateClick={onUpdateClick} />
              </TableBody>
            </Table>
          </div>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
