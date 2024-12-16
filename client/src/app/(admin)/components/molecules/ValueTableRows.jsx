import TableRow from "@mui/material/TableRow";
import ValueTableRow from "@adminAto/ValueTableRow";

export default function ValueTableRows({
  values,
  onUpdateClick,
  actions = true,
}) {
  return values.map((value, index) => (
    <TableRow key={value._id || index}>
      <ValueTableRow
        values={value}
        onUpdateClick={onUpdateClick}
        actions={actions}
      />
    </TableRow>
  ));
}
