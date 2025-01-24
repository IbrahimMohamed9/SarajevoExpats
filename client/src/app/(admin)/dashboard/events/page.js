import axiosInstance from "@/config/axios";
import AdminTableTemplete from "@adminTem/AdminTableTemplete";
import UsageProgressBars from "@adminAto/UsageProgressBars";

const Page = async () => {
  const response = await axiosInstance.get("events");
  const progressData = await fetch(
    `https://api.apify.com/v2/users/me/limits?token=${process.env.APIFY_API_TOKEN}`
  ).then((res) => res.json());

  return (
    <>
      <UsageProgressBars data={progressData} />
      <AdminTableTemplete tableKey="events" data={response.data} />
    </>
  );
};

export default Page;
