import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { useRef } from "react";

const NicaraguaLoVale = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allWpMediaItem(
          limit: 3
          filter: { slug: { regex: "/lovale/" } }
          sort: { fields: id, order: ASC }
        ) {
          edges {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: DOMINANT_COLOR
                    formats: [AUTO, WEBP, AVIF]
                    blurredOptions: { width: 50 }
                    quality: 100
                  )
                }
              }
            }
          }
        }
      }
    `
  );
  const links = [
    "https://www.instagram.com/p/Cj-2vmCrsYS/",
    "https://www.instagram.com/p/Cih0JerrTiH/",
    "https://www.instagram.com/p/Ci3f1gMLxdM/",
  ];
  const images = data.allWpMediaItem.edges.map(
    (edge) => edge.node.localFile.childImageSharp.gatsbyImageData
  );

  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);

  const goToSlide = (i) => {
    const child = carouselRef.current.children[0].getBoundingClientRect();
    carouselRef.current.scrollTo({ left: child.width * i, behavior: "smooth" });
  };

  const handleScroll = (e) => {
    const {width} = carouselRef.current.children[0].getBoundingClientRect();
    const index = Math.floor(carouselRef.current.scrollLeft / width);
    if (index != current) {
      setCurrent(index);
    }
  }

  return (
    <section className="nicaragua-lo-vale">
      <div className="container">
        <h2>
          #Nicaragua<span className="lo-vale">LoVale</span>
        </h2>
        <p className="subtitulo">
          Conocé el valor que tienen los productos locales
          a través de nuestra última campaña.
        </p>
        <div className="images" ref={carouselRef} onScroll={handleScroll}>
          {images.map((image, i) => (
            <a href={links[i]} key={i} target="_blank">
              <GatsbyImage
                image={image}
                className="image"
                width="300px"
                height="284px"
              />
            </a>
          ))}
        </div>
        <div className="controls">
          {links.map((link, i) => (
            <button
              onClick={() => goToSlide(i)}
              key={i}
              className={`controls__slider${i === current ? "--current" : ""}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NicaraguaLoVale;
