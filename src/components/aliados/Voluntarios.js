import { graphql, navigate, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { useEffect, useRef, useState } from "react";
import PlatformImage from "./PlatformImage.js";
import smoothScroll from "../../utils/smoothScroll.js";

const Voluntarios = () => {
  const data = useStaticQuery(graphql`
    query {
      allWpVoluntario(sort: { fields: date }) {
        nodes {
          voluntarios {
            nombre
            plataforma
            rol
            url
            imagen {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `);
  const voluntarios = data.allWpVoluntario.nodes.map(
    (node) => node.voluntarios
  );
  const [active, setActive] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [numberOfPages, setNumberOfPages] = useState(2);
  const carouselRef = useRef(null);

  const setSlides = () => {
    let visible = 3;
    if (window.outerWidth <= 568) {
      visible = 1;
    } else if (window.outerWidth <= 1024) {
      visible = 2;
    } else {
      visible = 3;
    }

    //number of pages
    const nop = voluntarios.length - visible + 1;
    setVisibleItems(visible);
    setNumberOfPages(nop);
  };

  useEffect(() => {
    window.addEventListener("resize", setSlides);
    setSlides();
    return () => window.removeEventListener("resize", setSlides);
  });

  const goToSlide = (i) => {
    setActive(i);
    const width = carouselRef.current.children[0].getBoundingClientRect().width;
    const to = width * i;
    const duration = 600; 
    smoothScroll(carouselRef.current, to, duration);
  };

  return (
    <section className="voluntarios">
      <div className="container">
        <h2>Voluntarios Emprende</h2>
        <p className="subtitulo">
          Poné tus habilidades en acción. Unite a nuestro programa e impactá en
          la comunidad
        </p>
        <div className="voluntarios__carousel" ref={carouselRef}>
          {data &&
            voluntarios.map((voluntario) => (
              <div className="voluntario" key={voluntario.nombre}>
                <GatsbyImage
                  image={
                    voluntario.imagen.localFile.childImageSharp.gatsbyImageData
                  }
                  title={voluntario.nombre}
                  alt={voluntario.nombre}
                  className="voluntario__img"
                  width={135}
                  height={135}
                />
                <div className="voluntario__text">
                  <p>
                    <b>{voluntario.nombre}</b>
                  </p>
                  <p>
                    <span>{voluntario.rol}</span>
                  </p>
                  <div className="voluntario__platform">
                    <a href={voluntario.url} target="_blank">
                      <PlatformImage platform={voluntario.plataforma} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="voluntarios__controls">
          {[...Array(numberOfPages)].map((btn, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={active === i ? "active" : ""}
            >
              <div></div>
            </button>
          ))}
        </div>
        <button 
          className="aplicar-ahora"
          onClick={() => navigate('/contacto')}
        >
          Aplicar ahora
        </button>
      </div>
    </section>
  );
};

export default Voluntarios;
