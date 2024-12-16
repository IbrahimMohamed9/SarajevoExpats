import BaseCard from "@organisms/BaseCard";
import axiosInstance from "@/config/axios";
import ErrorDisplay from "@molecules/ErrorDisplay";

const deleteLastS = (string) => {
  if (string === "news") return string;
  return string.slice(0, string.length - 1);
};

const CardsTemplete = async ({ url, type, data }) => {
  try {
    let items;
    if (!data) {
      const response = await axiosInstance.get(url);
      items = response.data;
    } else {
      items = data;
    }

    if (!items || items.length === 0) {
      return (
        <ErrorDisplay
          message={`No ${type} found. Please check back later.`}
          title={`No ${type} Found`}
        />
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-500">
          {items.length} {items.length === 1 ? deleteLastS(type) : type} found
        </p>

        <div className="flex flex-wrap justify-center py-5">
          {items.map((item, index) => (
            <BaseCard item={item} key={index} type={type} />
          ))}
        </div>
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
