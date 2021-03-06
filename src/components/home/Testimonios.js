import React, { useEffect, useState, useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Testimonios = () => {

  const data = useStaticQuery(graphql`
  query {
    allWpTestimonio {
      nodes {
        testimonio {
          title
          img {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 130
                  height: 130
                  placeholder: DOMINANT_COLOR
                  formats: [AUTO, WEBP, AVIF]
                  blurredOptions: {width: 50}
                  quality:100)
              }
            }
          }
          text
          stars
          label
          url
        }
      }
    }
  }
  `)

  const testimonials = data.allWpTestimonio.nodes.map(node => node.testimonio)

  const myRef = useRef(null);
  const [current, setCurrent] = useState(Math.round(testimonials.length / 2));
  const [carouselRef, setCarouselRef] = useState(null);
  const [items, setItems] = useState(testimonials);

  useEffect(() => {
    if (myRef.current) {
      setCarouselRef(myRef.current);
      const width = myRef.current.firstChild.getBoundingClientRect().width;
      const arr = [...items]
      const first = arr[0];
      const second = arr[1];
      const last = arr[arr.length - 1];
      const stl = arr[arr.length - 2];
      setItems([stl, last, ...arr, first, second]);
      myRef.current.scrollTo({ left: width * (Math.round(testimonials.length / 2)), behavior: 'instant' });
    }
  }, [myRef])


  const nextSlide = () => {
    let next = current + 1;
    const width = carouselRef.firstChild.getBoundingClientRect().width;

    if (next + 2 > items.length - 1) {
      const index = 1;
      carouselRef.scrollTo({ left: width * index, behavior: 'instant' });
      next = 2;
    }

    const pos = carouselRef.scrollLeft + width;
    carouselRef.scrollTo({ left: pos, behavior: 'smooth' })
    setCurrent(next);
  }

  const prevSlide = () => {
    let prev = current - 1;
    const width = carouselRef.firstChild.getBoundingClientRect().width;

    if (prev - 2 < 0) {
      console.log('lala');
      const index = items.length - 2;
      carouselRef.scrollTo({ left: width * index, behavior: 'instant' });
      prev = items.length - 3;
    }

    const pos = carouselRef.scrollLeft - width;
    carouselRef.scrollTo({ left: pos, behavior: 'smooth' });
    setCurrent(prev);
  }


  return (
    <section className="testimonials">
      <div className="container">
        <h2>Logros de nuestros emprendedores</h2>
        <p className="subtitulo">
          El apoyo de nuestros aliados ha impactado
          la vida y econom??a de muchas familias
        </p>
      </div>
      <div className="testimonials__carousel" ref={myRef}>
        {
          items.map((tes, i) => (
            <div className="testimonials__item" key={tes.title + i}>
              <GatsbyImage
                image={tes.img.localFile.childImageSharp.gatsbyImageData}
                alt={tes.title}
                className="testimonials__item__img"
                width="130px"
                height="130px"
              />
              <div className="testimonials__item__stars">
                {[...Array(5)].map((star, i) => (
                  <FaStar size="24px" key={i} color={tes.stars > i ? '#F8B44B' : '#736d6d'} />
                ))}
              </div>

              <p>{tes.text}</p>
              <p>{tes.title} {" / "}
                <b>
                  <a target="_blank" rel="noreferrer" href={tes.url}>{tes.label}</a>
                </b>
              </p>
              {
                i === current &&
                <>
                  <button className="prev-slide controls" onClick={() => prevSlide()}>
                    {<FaChevronLeft size="30px" />}
                  </button>
                  <button className="next-slide controls" onClick={() => nextSlide()}>
                    {<FaChevronRight size="30px" />}
                  </button>
                </>
              }
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Testimonios;