import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import CustomTableRows from "@molecules/CustomTableRows";
import Typography from "@mui/material/Typography";
import HeaderTableRow from "@atoms/HeaderTableRow";

const CollapsibleTable = ({ tableKey, subDataTitle, data }) => {
  if (data.length === 0) {
    return (
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        No data available
      </Typography>
    );
  }

  return (
    <TableContainer className="border border-gray-300">
      <Table aria-label="collapsible table">
        <HeaderTableRow data={data[0]} includeEmpty={subDataTitle} />
        <CustomTableRows
          data={data}
          tableKey={tableKey}
          subDataTitle={subDataTitle}
        />
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
