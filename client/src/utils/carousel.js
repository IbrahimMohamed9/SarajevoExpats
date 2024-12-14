const carouselSplide = (carousel, gap = 25) => {
  const splideTrack = document.querySelector(`${carousel} .splide__track`);

  const widthOfCol =
    document.querySelector(`${carousel} .splide__slide`).offsetWidth + gap;

  // check overflow
  const totalWidth = splideTrack.children[0].children.length * widthOfCol;

  if (totalWidth > document.documentElement.offsetWidth || totalWidth > 1170) {
    splideTrack.parentElement.parentElement.classList.add("overflow");

    //arrow design
    const arrows = document.querySelectorAll(
      ".splide__arrows.splide__arrows--ltr .arrow"
    );
    arrows.forEach((arrow) => {
      arrow.addEventListener("focus", () => {
        arrow.classList.add("active");
      });
      arrow.addEventListener("blur", () => {
        arrow.classList.remove("active");
      });
    });

    const splide = new Splide(carousel, {
      type: "loop",
      perPage: Math.floor(splideTrack.offsetWidth / widthOfCol),
      perMove: 1,
      focus: 0,
      gap: gap,
      autoWidth: true,
      keyboard: "global",
      wheel: true,
      speed: 1500,
      wheelSleep: 200,
      classes: {
        arrows: "splide__arrows your-class-arrows",
        arrow: "splide__arrow your-class-arrow",
        prev: "splide__arrow--prev your-class-prev left-arrow arrow",
        next: "splide__arrow--next your-class-next right-arrow arrow",
      },
    }).mount();
  } else {
    splideTrack.parentElement.classList.remove("splide");
    splideTrack.parentElement.classList.add("not-overflow");
  }
};

export default carouselSplide;
