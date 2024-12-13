import axiosInstance from "@/config/axios";
import AdminTableTemplete from "@adminTem/AdminTableTemplete";

const Page = async () => {
  const response = await axiosInstance.get("events");
  const dataTemp = {
    title: "",
    content: "",
    picture: "",
    pictureDescription: "",
    url: "",
    phone: "",
    email: "",
  };

  return (
    <AdminTableTemplete
      title="Events"
      tableKey="events"
      data={response.data}
      dataTemp={dataTemp}
    />
  );
};

export default Page;
