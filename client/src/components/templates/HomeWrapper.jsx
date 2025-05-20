"use client";

import { Fragment } from "react";
import HomeTemplate from "./HomeTemplate";
import PlaceModal from "@/components/organisms/PlaceModal";

const HomeWrapper = (props) => {
  return (
    <Fragment>
      <HomeTemplate {...props} />
      <PlaceModal />
    </Fragment>
  );
};

export default HomeWrapper;
