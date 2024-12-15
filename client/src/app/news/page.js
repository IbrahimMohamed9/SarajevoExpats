import BaseCard from "@atoms/BaseCard";
import axiosInstance from "@/config/axios";

const News = async () => {
  const news = await axiosInstance.get("/news");
  const newsColumnElements = news.data.map((news, index) => (
    <BaseCard item={news} key={index} type="news" />
  ));
  return (
    <div className="flex flex-wrap justify-center py-5">
      {newsColumnElements}
    </div>
  );
};

export default News;
