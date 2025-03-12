import AdminTableTemplete from "@adminTem/AdminTableTemplete";
import axiosInstance from "@/config/axios";

const Page = async () => {
  const qaAsResponse = await axiosInstance.get("qaas");
  const dataTemp = {
    question: "",
    answer: "",
  };

  return (
    <AdminTableTemplete
      tableKey="qaas"
      data={qaAsResponse.data}
      dataTemp={dataTemp}
    />
  );
};

export default Page;
