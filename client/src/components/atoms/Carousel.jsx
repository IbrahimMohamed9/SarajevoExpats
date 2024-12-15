"use client";

import { Splide, SplideTrack } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";
// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
// or only core styles
import "@splidejs/react-splide/css/core";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Carousel = ({ children }) => {
  const getWidthWithoutPadding = (el) => {
    let style = window.getComputedStyle(el);
    return (
      el.offsetWidth -
      parseFloat(style.paddingLeft) -
      parseFloat(style.paddingRight)
    );
  };

  const splide = useRef(null);
  const [slidesPerPage, setSlidesPerPage] = useState(null);

  useEffect(() => {
    if (splide.current == null) return null;
    const splideTrack = splide.current.slides;
    const splideTrackWidth = getWidthWithoutPadding(
      splide.current.splideRef.current
    );

    const widthOfCol = splideTrack[0].children[0].offsetWidth + 10;
    const totalWidth = splideTrack.length * widthOfCol;

    if (
      totalWidth > document.documentElement.offsetWidth ||
      totalWidth > 1170
    ) {
      setSlidesPerPage(Math.floor(splideTrackWidth / widthOfCol));
    }
  }, [splide]);

  const arrowClass = "!fill-black !size-7";
  const ButtonClass = "splide__arrow min-w-0 !bg-main !rounded-lg";

  return (
    <Splide
      ref={splide}
      hasTrack={false}
      options={{
        focus: 0,
        perPage: slidesPerPage,
        perMove: 1,
        pagination: true,
        gap: "0px",
        autoWidth: true,
        keyboard: "global",
        wheel: true,
        speed: 1500,
        wheelSleep: 200,
      }}
    >
      <SplideTrack>{children}</SplideTrack>
      <div className="splide__arrows flex justify-between">
        <Button
          variant="outlined"
          className={`splide__arrow--prev ${ButtonClass}`}
        >
          <ArrowForwardIcon className={arrowClass} />
        </Button>
        <Button
          variant="outlined"
          className={`splide__arrow--next -mr-2 ${ButtonClass}`}
        >
          <ArrowForwardIcon className={arrowClass} />
        </Button>
      </div>
    </Splide>
  );
};

export default Carousel;
