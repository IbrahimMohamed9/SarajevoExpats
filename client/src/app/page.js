import axiosInstance from "@/config/axios";
import CollapsibleTable from "@/components/organisms/CollapsibleTable";
import Button from "@mui/material/Button";

export default async function Home() {
  const response1 = await axiosInstance.get("/placetypes/with-places");
  const response2 = await axiosInstance.get("/serviceSubtypes/with-services");
  const response3 = await axiosInstance.get("/serviceTypes/with-subtypes");

  return (
    <>
      <div className="container m-auto flex flex-col gap-4 overflow-hidden p-5">
        <div className="flex justify-end">
          <Button variant="contained" color="primary">
            Add New
          </Button>
        </div>
        <CollapsibleTable dataList={response1.data} subDataTitle={"Places"} />
      </div>

      <div className="container m-auto flex flex-col gap-4 overflow-hidden p-5">
        <div className="flex justify-end">
          <Button variant="contained" color="primary">
            Add New
          </Button>
        </div>
        <CollapsibleTable dataList={response2.data} subDataTitle={"Services"} />
      </div>

      <div className="container m-auto flex flex-col gap-4 overflow-hidden p-5">
        <div className="flex justify-end">
          <Button variant="contained" color="primary">
            Add New
          </Button>
        </div>
        <CollapsibleTable dataList={response3.data} subDataTitle={"Subtypes"} />
      </div>
    </>
  );
}
