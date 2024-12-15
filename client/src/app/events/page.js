import BaseCard from "@atoms/BaseCard";
import axiosInstance from "@/config/axios";

const Events = async () => {
  const events = await axiosInstance.get("/events");
  const eventsColumnElements = events.data.map((event, index) => (
    <BaseCard item={event} key={index} />
  ));
  return (
    <div className="flex flex-wrap justify-center py-5">
      {eventsColumnElements}
    </div>
  );
};

export default Events;
