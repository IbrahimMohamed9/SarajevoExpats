"use client";

import { useEffect } from "react";
import { TableBody } from "@mui/material";
import CustomTableRow from "@adminMol/CustomTableRow";
import { tablesAtom } from "@/store/atoms/tablesAtom";
import { useRecoilState } from "recoil";

const CustomTableRows = ({ data, tableKey, subDataTitle }) => {
  const [tables, setTables] = useRecoilState(tablesAtom);

  useEffect(() => {
    setTables((prev) => ({
      ...prev,
      [tableKey]: data,
    }));
  }, [data, tableKey, setTables]);

  return (
    <TableBody>
      {tables[tableKey]?.map((item) => (
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
