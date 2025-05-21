"use client";

import { Fragment } from "react";
import HomeTemplate from "./HomeTemplate";

const HomeWrapper = (props) => {
  return (
    <Fragment>
      <HomeTemplate {...props} />
    </Fragment>
  );
};

export default HomeWrapper;
