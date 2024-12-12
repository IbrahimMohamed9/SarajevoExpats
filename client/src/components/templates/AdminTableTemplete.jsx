import React from "react";
import CollapsibleTable from "@organisms/CollapsibleTable";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const AdminTableTemplete = ({ title, tableKey, subDataTitle, data }) => {
  return (
    <div className="m-auto flex flex-col gap-4 pr-3 pt-4">
      <div className="flex justify-between">
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Button variant="contained" color="primary">
          Add New
        </Button>
      </div>
      <CollapsibleTable
        tableKey={tableKey}
        data={data}
        subDataTitle={subDataTitle}
      />
    </div>
  );
};

export default AdminTableTemplete;
