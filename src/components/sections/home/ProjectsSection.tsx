
"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "../../ui/Button";

const projects = [
  {
    image: "/images/method-img.png",
    category: ["WooCommerce", "Fashion"],
    title: "Modekledinglijn — Amsterdam",
    description:
      "Een strakke, mobiel-vriendelijke webshop voor een Amsterdamse modezaak. Inclusief maatwerk productfilters en Mollie-betaalintegratie.",
  },
  {
    image: "/images/method-img.png",
    category: ["WooCommerce", "Fashion"],
    title: "Modekledinglijn — Amsterdam",
    description:
      "Een strakke, mobiel-vriendelijke webshop voor een Amsterdamse modezaak. Inclusief maatwerk productfilters en Mollie-betaalintegratie.",
  },
  {
    image: "/images/method-img.png",
    category: ["WooCommerce", "Fashion"],
    title: "Modekledinglijn — Amsterdam",
    description:
      "Een strakke, mobiel-vriendelijke webshop voor een Amsterdamse modezaak. Inclusief maatwerk productfilters en Mollie-betaalintegratie.",
  },
  {
    image: "/images/method-img.png",
    category: ["WooCommerce", "Fashion"],
    title: "Modekledinglijn — Amsterdam",
    description:
      "Een strakke, mobiel-vriendelijke webshop voor een Amsterdamse modezaak. Inclusief maatwerk productfilters en Mollie-betaalintegratie.",
  },
];



function ProjectsSection() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  return (
    <section className="method-sec">
      <div className="wrapper">
        <div className="top-part">
          <div className="sub-title">Werkwijze</div>
          <h2>Onze projecten</h2>
          <p>
            Een greep uit de webshops die wij hebben gebouwd voor tevreden
            klanten door heel Nederland.
          </p>
        </div>

        <div className="outer-part">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true,
            }}
            onBeforeInit={(swiper: SwiperType) => {
              if (typeof swiper.params.navigation !== "boolean") {
                swiper.params.navigation = {
                  ...swiper.params.navigation,
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                };
              }

              if (typeof swiper.params.pagination !== "boolean") {
                swiper.params.pagination = {
                  ...swiper.params.pagination,
                  el: paginationRef.current,
                  clickable: true,
                };
              }
            }}
            breakpoints={{
              768: {
                slidesPerView: 1,
              },
              1100: {
                slidesPerView: 1,
              },
            }}
            className="method-slider"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <div className="method-card">
                  <div className="left-part">
                    <img src={project.image} alt={project.title} />
                  </div>

                  <div className="right-part">
                    <div className="category">
                      {project.category.map((category) => (
                        <span className="cat" key={category}>
                          {category}
                        </span>
                      ))}
                    </div>

                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                      <Button link="#" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-controls">
            <div className="wrap">
              <button
                ref={prevRef}
                type="button"
                className="method-prev swiper-arrow"
                aria-label="Previous project"
              >
                <svg
                  width="29"
                  height="15"
                  viewBox="0 0 29 15"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M27.2568 7.48823L0.898579 7.48823M7.48813 14.0778L0.898579 7.48823L7.48813 0.898682"
                    stroke="#0F1A14"
                    strokeWidth="1.79715"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div ref={paginationRef} className="method-dots" />

              <button
                ref={nextRef}
                type="button"
                className="method-next swiper-arrow"
                aria-label="Next project"
              >
                <svg
                  width="29"
                  height="15"
                  viewBox="0 0 29 15"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M27.2568 7.48823L0.898579 7.48823M7.48813 14.0778L0.898579 7.48823L7.48813 0.898682"
                    stroke="#0F1A14"
                    strokeWidth="1.79715"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(29 15) rotate(180)"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
