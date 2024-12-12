import React from "react";
import axiosInstance from "@/config/axios";
import CollapsibleTable from "@/components/organisms/CollapsibleTable";
import Button from "@mui/material/Button";

const page = async () => {
  const response = await axiosInstance.get("/news");

  return (
    <div className="m-auto flex flex-col gap-4 pr-3 pt-4">
      <div className="flex justify-end">
        <Button variant="contained" color="primary">
          Add New
        </Button>
      </div>
      <CollapsibleTable dataList={response.data} />
    </div>
  );
};

export default page;
