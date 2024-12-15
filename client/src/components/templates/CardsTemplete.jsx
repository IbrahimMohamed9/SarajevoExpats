import BaseCard from "@organisms/BaseCard";
import axiosInstance from "@/config/axios";
import ErrorDisplay from "@molecules/ErrorDisplay";

const CardsTemplete = async ({ url, type }) => {
  try {
    const response = await axiosInstance.get(url);
    const items = response.data;

    if (!items || items.length === 0) {
      return (
        <ErrorDisplay
          message={`No ${type} found. Please check back later.`}
          title={`No ${type} Found`}
        />
      );
    }

    return (
      <div className="flex flex-wrap justify-center py-5">
        {items.map((item, index) => (
          <BaseCard item={item} key={index} type={type} />
        ))}
      </div>
    );
  } catch (err) {
    return (
      <ErrorDisplay
        message={
          err.response?.data?.message ||
          "No items found. Please try again later."
        }
        title={`No ${type} Found`}
      />
    );
  }
};

export default CardsTemplete;
