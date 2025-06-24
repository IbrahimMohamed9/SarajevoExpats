"use client";

import BaseCardHorizontal from "@organisms/BaseCardHorizontal";
import axiosInstance from "@/config/axios";
import ErrorDisplay from "@molecules/ErrorDisplay";
import { useEffect, useState } from "react";
import LoadingCards from "@templates/LoadingCards";
import { useRecoilState } from "recoil";
import { loadingAtom } from "@/store/atoms/loadingAtom";
import LoadingArticle from "@templates/LoadingArticle";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const CardsTemplate = ({ url, pageType, type, data }) => {
  const [items, setItems] = useState(data);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [firstLoad, setFirstLoad] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

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

  useEffect(() => {
    if (items && items.length > 0) {
      const allTags = new Set();
      items.forEach((item) => {
        if (item.tags && Array.isArray(item.tags)) {
          item.tags.forEach((tag) => allTags.add(tag));
        }
      });
      setAvailableTags(Array.from(allTags));

      setFilteredItems(items);
    }
  }, [items]);

  useEffect(() => {
    if (items && items.length > 0) {
      if (selectedTags.length === 0) {
        setFilteredItems(items);
      } else {
        const filtered = items.filter(
          (item) =>
            Array.isArray(item.tags) &&
            selectedTags.every((tag) => item.tags.includes(tag))
        );
        setFilteredItems(filtered);
      }
    }
  }, [selectedTags, items]);

  const handleTagClick = (tag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const clearAllTags = () => {
    setSelectedTags([]);
  };

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

  let cardsElements = filteredItems.map((item, index) => (
    <BaseCardHorizontal item={item} key={index} type={pageType} />
  ));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {availableTags.length > 0 && (
        <div className="mb-6 rounded-lg shadow-md bg-gradient-to-r from-orange-50 to-amber-50 overflow-hidden">
          <div className="p-4 border-b border-orange-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FilterAltIcon className="text-main mr-2" />
                <h3 className="text-lg font-medium text-tertiary">
                  Filter by Tags
                </h3>
              </div>
              {selectedTags.length > 0 && (
                <button
                  onClick={clearAllTags}
                  className="px-3 py-1 text-xs font-medium rounded-full border border-tertiary text-tertiary hover:bg-tertiary hover:text-white transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 p-4 bg-white bg-opacity-70">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`
                  px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    selectedTags.includes(tag)
                      ? "bg-main text-white shadow-md hover:bg-tertiary"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow"
                  }
                  transform hover:-translate-y-0.5
                `}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 italic">
          {filteredItems.length} {type} found
        </p>
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Active filters:
            </span>
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-main text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsElements}
      </div>
    </div>
  );
};

export default CardsTemplate;
