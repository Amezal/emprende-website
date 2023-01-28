import React, { useEffect, useState } from "react";
import BackgroundImage from "gatsby-background-image";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";

const Hero = ({ hero }) => {
  const [loaded, setLoaded] = useState(false);

  const image = getImage(hero.image.localFile);
  const bgImage = convertToBgImage(image);
  hero.img = bgImage;

  useEffect(() => {
    setLoaded(true);
  }, [hero]);

  return (
    <BackgroundImage
      Tag="section"
      className="hero2"
      {...hero.img}
      preserveStackingContext
    >
      <div
        className={`container hero2__content${
          loaded ? " hero2__content--current" : ""
        }`}
      >
        <span>
          <h1
            dangerouslySetInnerHTML={{ __html: `${hero.ctaText}` }}
            style={{ color: hero.fontColor }}
          ></h1>
        </span>
        <button>{hero.ctaButton}</button>
      </div>
    </BackgroundImage>
  );
};

export default Hero;
