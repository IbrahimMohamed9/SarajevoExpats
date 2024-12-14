import { Splide, SplideTrack } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";
// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";
// or only core styles
import "@splidejs/react-splide/css/core";
import { useEffect, useRef, useState } from "react";

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
      console.log(Math.floor(splideTrackWidth / widthOfCol));
      setSlidesPerPage(Math.floor(splideTrackWidth / widthOfCol));
    } else console.log("none");
  }, [splide]);

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

      <div className="splide__arrows flex justify-between mt-2">
        <button className="splide__arrow splide__arrow--prev bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition">
          Prev
        </button>
        <button className="splide__arrow splide__arrow--next bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition">
          Next
        </button>
      </div>
    </Splide>
  );
};

export default Carousel;
