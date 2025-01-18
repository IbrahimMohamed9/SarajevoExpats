"use client";

import BaseCard from "@organisms/BaseCard";
import axiosInstance from "@/config/axios";
import ErrorDisplay from "@molecules/ErrorDisplay";
import { useEffect, useState } from "react";
import LoadingCards from './LoadingCards';

const getSingularForm = (string) => {
  if (string === "news") return string;
  return string.slice(0, string.length - 1);
};

const CardsTemplete = ({ url, type, data }) => {
  const [items, setItems] = useState(data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (!data) {
        const response = await axiosInstance.get(url);
        setItems(response.data);
      }
      setLoading(false)
    };

    init();
  }, []);

  if (loading) return <LoadingCards />

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
        {items.length} {items.length === 1 ? getSingularForm(type) : type} found
      </p>

      <div className="flex flex-wrap justify-center py-5">
        {items.map((item, index) => (
          <BaseCard item={item} key={index} type={type} />
        ))}
      </div>
    </div>
  );
};

export default CardsTemplete;
