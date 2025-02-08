"use client";

import BaseCard from "@organisms/BaseCard";
import BaseCardHorizontal from "@organisms/BaseCardHorizontal";
import axiosInstance from "@/config/axios";
import ErrorDisplay from "@molecules/ErrorDisplay";
import { useEffect, useState } from "react";
import LoadingCards from "@templates/LoadingCards";
import { useRecoilState } from "recoil";
import { loadingAtom } from "@/store/atoms/loadingAtom";
import LoadingArticle from "@templates/LoadingArticle";

const CardsTemplate = ({ url, pageType, type, data }) => {
  const [items, setItems] = useState(data);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    setLoading(true);
    const init = async () => {
      if (!data) {
        const fetchedItems = await axiosInstance.get(url);
        setItems(fetchedItems.data);
      }
      setLoading(false);
      setFirstLoad(false);
    };

    init();
  }, [url, data, setLoading]);

  if ((loading && !items) || firstLoad) return <LoadingCards />;
  if (loading) return <LoadingArticle />;

  if ((!items || items.length === 0) && !firstLoad) {
    return (
      <ErrorDisplay
        message={`No ${type} found. Please check back later.`}
        title={`No ${type} Found`}
      />
    );
  }

  let cardsElements = items.map((item, index) => (
    <BaseCardHorizontal item={item} key={index} type={pageType} />
  ));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <p className="text-gray-500">
        {items.length} {type} found
      </p>
      <div className="flex flex-wrap justify-center py-5">{cardsElements}</div>
    </div>
  );
};

export default CardsTemplate;
