import Table from "@mui/material/Table";
import CustomTableRows from "@adminMol/CustomTableRows";
import Typography from "@mui/material/Typography";
import HeaderTableRow from "@adminAto/HeaderTableRow";
import { TableContainer } from "@mui/material";

const CollapsibleTable = ({ tableKey, subDataTitle, data }) => {
  if (!data || data.length === 0) {
    return (
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        No data available
      </Typography>
    );
  }

  return (
    <TableContainer className="border border-gray-300 rounded-lg shadow-sm">
      <Table stickyHeader>
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
