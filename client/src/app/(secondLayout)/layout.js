"use client";

import LoadingCards from "@templates/LoadingCards";
import LoadingArticle from "@templates/LoadingArticle";
import { loadingAtom } from "@/store/atoms/loadingAtom";
import { useRecoilValue } from "recoil";

const layout = ({ children }) => {
  const loadingState = useRecoilValue(loadingAtom);

  const childrenElement = () => {
    if (loadingState.card) return <LoadingCards />;
    if (loadingState.article) return <LoadingArticle />;

    return children;
  };

  return childrenElement();
};

export default layout;
