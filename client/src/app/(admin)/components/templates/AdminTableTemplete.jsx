import React from "react";
import CollapsibleTable from "@adminOrg/CollapsibleTable";
import AddItemBtn from "@adminAto/AddItemBtn";

const AdminTableTemplete = ({ tableKey, subDataTitle, data, dataTemp }) => {
  return (
    <div className="relative w-full">
      {dataTemp && <AddItemBtn tableKey={tableKey} data={dataTemp} />}
      <div className="p-2 min-w-0 overflow-x-auto">
        <CollapsibleTable
          tableKey={tableKey}
          data={data}
          subDataTitle={subDataTitle}
        />
      </div>
    </div>
  );
};

export default AdminTableTemplete;
