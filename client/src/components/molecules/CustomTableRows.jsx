"use client";

import { useEffect } from "react";
import { TableBody } from "@mui/material";
import CustomTableRow from "@molecules/CustomTableRow";
import { tablesAtom } from "@/store/atoms/tablesAtom";
import { useRecoilState } from "recoil";

const CustomTableRows = ({ data, tableKey, subDataTitle }) => {
  const [tables, setTables] = useRecoilState(tablesAtom);

  useEffect(() => {
    setTables((prev) => ({
      ...prev,
      [tableKey]: data,
    }));
  }, []);

  const tableData = tables[tableKey] || data;

  return (
    <TableBody>
      {tableData.map((item) => (
        <CustomTableRow
          key={item._id}
          data={item}
          tableKey={tableKey}
          subDataTitle={subDataTitle}
        />
      ))}
    </TableBody>
  );
};

export default CustomTableRows;
