import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import CustomTableRow from "../molecules/CustomTableRow";
import Typography from "@mui/material/Typography";
import HeaderTableRow from "../atoms/HeaderTableRow";

export default function CollapsibleTable({ dataList, subDataTitle }) {
  if (!dataList || dataList.length === 0) {
    return (
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        No data available
      </Typography>
    );
  }

  const dataBodyElement = dataList.map((data, index) => (
    <CustomTableRow
      key={data._id || index}
      data={data}
      subDataTitle={subDataTitle}
    />
  ));

  return (
    <TableContainer className="border border-gray-300">
      <Table aria-label="collapsible table">
        <HeaderTableRow data={dataList[0]} includeEmpty={subDataTitle} />
        <TableBody>{dataBodyElement}</TableBody>
      </Table>
    </TableContainer>
  );
}
