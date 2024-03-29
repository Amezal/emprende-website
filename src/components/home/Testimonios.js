import React, { useEffect, useState, useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import smoothScroll from '../../utils/smoothScroll';

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
                  width: 115
                  height: 115
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
  const [gap, setGap] = useState(0);
  let mobileOffset = false;

  if (typeof window !== "undefined") {
    if (window.innerWidth <= 568) {
      mobileOffset = true;
    }
  }

  useEffect(() => {
    if (myRef.current) {
      setCarouselRef(myRef.current);
      const width = myRef.current.firstChild.getBoundingClientRect().width;
      const currentGap = myRef.current.children[1].getBoundingClientRect().left - myRef.current.children[0].getBoundingClientRect().left - width;
      setGap(currentGap);
      const arr = [...items]
      const first = arr[0];
      const second = arr[1];
      const last = arr[arr.length - 1];
      const stl = arr[arr.length - 2];
      setItems([stl, last, ...arr, first, second]);
      console.log(currentGap, width, mobileOffset);
      // myRef.current.children[2].scrollIntoView({block: "nearest", inline: "nearest"})
      // debugger;
      const pos = myRef.current.children[2].offsetLeft - (window.innerWidth - width) / 2
      myRef.current.scrollTo({left: pos, behavior: 'instant'})
      // if(!mobileOffset) {
      //   myRef.current.scrollTo({ left: width + currentGap, behavior: 'instant' });
      // } else {
      //   myRef.current.scrollTo({ left: width * 3 - (currentGap - 5), behavior: 'instant' });
      // }
    }
  }, [myRef])


  const nextSlide = () => {
    let next = current + 1;
    const width = carouselRef.firstChild.getBoundingClientRect().width;

    if (next + 1 > items.length - 1) {
      const index = 2;
      const pos = carouselRef.children[index].offsetLeft - (window.innerWidth - width) / 2;
      carouselRef.scrollTo({left: pos, behavior: 'instant'});
      next = 3;
    }

    const to = carouselRef.scrollLeft + width + gap;
    const duration = 200;
    smoothScroll(carouselRef, to, duration);
    setCurrent(next);
  }

  const prevSlide = () => {
    let prev = current - 1;
    const width = carouselRef.firstChild.getBoundingClientRect().width;

    if (prev - 2 < 0) {
      const index = items.length - 2;
      const pos = carouselRef.children[index].offsetLeft - (window.innerWidth - width) / 2;
      carouselRef.scrollTo({left: pos, behavior: 'instant'});
      prev = items.length - 3;
    }
    console.log(gap);
    const to = carouselRef.scrollLeft - width - gap;
    const duration = 100;
    smoothScroll(carouselRef, to, duration);
    setCurrent(prev);
  }


  return (
    <section className="testimonials">
      <div className="container">
        <h2>Logros de nuestros emprendedores</h2>
        <p className="subtitulo">
          El apoyo de nuestros aliados ha impactado
          la vida y economía de muchas familias.
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
                width="80px"
                height="80px"
              />
              <div className="testimonials__item__stars">
                {[...Array(5)].map((star, i) => (
                  <FaStar size="18px" key={i} color={tes.stars > i ? '#F8B44B' : '#736d6d'} />
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
                    {<FaChevronLeft size="18px" />}
                  </button>
                  <button className="next-slide controls" onClick={() => nextSlide()}>
                    {<FaChevronRight size="18px" />}
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