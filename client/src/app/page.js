import axiosInstance from "../config/axios";
import CollapsibleTable from "../components/organisms/CollapsibleTable";

export default async function Home() {
  const response1 = await axiosInstance.get("/placetypes/with-places");
  const response2 = await axiosInstance.get("/serviceSubtypes/with-services");
  const response3 = await axiosInstance.get("/serviceTypes/with-subtypes");

  return (
    <>
      <div className="container m-auto flex justify-center overflow-hidden p-5">
        <CollapsibleTable dataList={response1.data} subDataTitle={"Places"} />
      </div>

      <div className="container m-auto flex justify-center overflow-hidden p-5">
        <CollapsibleTable dataList={response2.data} subDataTitle={"Services"} />
      </div>

      <div className="container m-auto flex justify-center overflow-hidden p-5">
        <CollapsibleTable dataList={response3.data} subDataTitle={"Subtypes"} />
      </div>
    </>
  );
}
