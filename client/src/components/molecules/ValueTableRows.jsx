import TableRow from "@mui/material/TableRow";
import ValueTableRow from "../atoms/ValueTableRow";

export default function ValueTableRows({ values, onUpdateClick }) {
  return values.map((value, index) => (
    <TableRow key={value._id || index}>
      <ValueTableRow value={value} onUpdateClick={onUpdateClick} />
    </TableRow>
  ));
}
