import React from 'react';
import InfiniteCarousel from 'react-leaf-carousel';

const Infinite = ({children}) => {
  let isMobile = false;
  if (typeof window !== "undefined") {
    if (window.innerWidth <= 568) {
      isMobile = true;
    }
  }
  return (
    <InfiniteCarousel
      breakpoints={[
        {
          breakpoint: 568,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,

          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ]}
      lazyLoad={false}
      dots={isMobile}
      showSides={false}
      slidesToScroll={2}
      slidesToShow={4}
      scrollOnDevice={true}
      autoCycle={false}
      slidesSpacing={50}
    >
      {children}
    </InfiniteCarousel>
  );
}

export default Infinite;