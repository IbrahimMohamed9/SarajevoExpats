import axiosInstance from "@/config/axios";
import AdminTableTemplete from "@adminTem/AdminTableTemplete";

const Page = async () => {
  const response = await axiosInstance.get("news");
  const dataTemp = {
    title: "",
    content: "",
    picture: "",
    pictureDescription: "",
    sources: "",
    showInSlider: false,
    slidePriority: 0,
  };

  return (
    <AdminTableTemplete
      tableKey="news"
      data={response.data}
      dataTemp={dataTemp}
    />
  );
};

export default Page;
