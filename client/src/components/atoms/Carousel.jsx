import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";

const Carousel = ({ children }) => {
  const responsive = {
    first: {
      breakpoint: { max: 30000, min: 1270 },
      items: 3.5,
    },
    second: {
      breakpoint: { max: 1269, min: 1157 },
      items: 3,
    },
    third: {
      breakpoint: { max: 1156, min: 1120 },
      items: 2.7,
    },
    fourth: {
      breakpoint: { max: 1119, min: 1000 },
      items: 2.2,
    },
    fifth: {
      breakpoint: { max: 999, min: 950 },
      items: 2,
    },
    sixth: {
      breakpoint: { max: 950, min: 930 },
      items: 1.8,
    },
    seventh: {
      breakpoint: { max: 930, min: 865 },
      items: 1.6,
    },
    eighth: {
      breakpoint: { max: 865, min: 830 },
      items: 1.4,
    },
    ninth: {
      breakpoint: { max: 830, min: 820 },
      items: 1.3,
    },
    tenth: {
      breakpoint: { max: 820, min: 790 },
      items: 1.1,
    },
    eleventh: {
      breakpoint: { max: 790, min: 767 },
      items: 1,
    },
    twentieth: {
      breakpoint: { max: 767, min: 730 },
      items: 2.5,
    },
    thirteenth: {
      breakpoint: { max: 730, min: 670 },
      items: 2.3,
    },
    fourteenth: {
      breakpoint: { max: 670, min: 600 },
      items: 2,
    },
    fifteenth: {
      breakpoint: { max: 600, min: 545 },
      items: 1.7,
    },
    sixteenth: {
      breakpoint: { max: 545, min: 490 },
      items: 1.4,
    },
    seventeenth: {
      breakpoint: { max: 490, min: 440 },
      items: 1.2,
    },
    eighteenth: {
      breakpoint: { max: 440, min: 424 },
      items: 1,
    },
    nineteenth: {
      breakpoint: { max: 424, min: 400 },
      items: 1.8,
    },
    twentieth: {
      breakpoint: { max: 400, min: 340 },
      items: 1.5,
    },
    twentyfirst: {
      breakpoint: { max: 340, min: 0 },
      items: 1.3,
    },
  };

  const ButtonClass =
    "!absolute !z-10 !bg-white/90 hover:!bg-white !shadow-md !min-w-0 !p-2";

  const ArrowFix = (arrowProps) => {
    const { carouselState, children, rtl, ...restArrowProps } = arrowProps;
    return <span {...restArrowProps}> {children}</span>;
  };

  return (
    <div className="relative group">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={true}
        className=""
        containerClass="container"
        draggable
        itemClass=""
        pauseOnHover
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        infinite={false}
        rewind={false}
        rewindWithAnimation={false}
        shouldResetAutoplay
        autoPlay={false}
        minimumTouchDrag={80}
        slidesToSlide={1}
        swipeable
        customLeftArrow={
          <ArrowFix>
            <Button
              variant="contained"
              className={`${ButtonClass} !left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            >
              <ArrowForwardIcon className="rotate-180 !text-gray-800" />
            </Button>
          </ArrowFix>
        }
        customRightArrow={
          <ArrowFix>
            <Button
              variant="contained"
              className={`${ButtonClass} !right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            >
              <ArrowForwardIcon className="!text-gray-800" />
            </Button>
          </ArrowFix>
        }
      >
        {children}
      </Carousel>
    </div>
  );
};

export default Carousel;
