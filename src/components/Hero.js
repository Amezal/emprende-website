import React, { useEffect, useState } from "react";
import BackgroundImage from "gatsby-background-image";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import { navigate } from "gatsby";

const Hero = ({ hero }) => {
  const [loaded, setLoaded] = useState(false);
  const image = getImage(hero.image.localFile);
  const imageMobile = getImage(hero.imageMobile.localFile);
  const bgImage = convertToBgImage(image);
  const bgImageMobile = convertToBgImage(imageMobile);
  hero.sources = [
    bgImage.fluid,
    {
      ...bgImageMobile.fluid,
      media: `(max-width: 568px)`,
    },
  ]

  useEffect(() => {
    setLoaded(true);
  }, [hero]);

  return (
    <BackgroundImage
      Tag="section"
      className="hero2"
      fluid={hero.sources}
      preserveStackingContext
      title={hero.image.altText}
      alt={hero.image.altText}
    >
      <div
        className={`container hero2__content${
          loaded ? " hero2__content--current" : ""
        }`}
        title=""
      >
        <span>
          <h1
            dangerouslySetInnerHTML={{ __html: `${hero.ctaText}` }}
            style={{ color: hero.fontColor }}
          ></h1>
        </span>
        <button
          onClick={() => navigate(hero.redirect)}
        >
          {hero.ctaButton}
        </button>
      </div>
    </BackgroundImage>
  );
};

export default Hero;
