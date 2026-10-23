
"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Button from "../../ui/Button";
import { useSelectedProjecten } from "@/hooks/useSelectedProjecten";
import { useHomePage } from "@/hooks/useHomePage";

function ProjectsSection() {

const { data: homePage } = useHomePage();
const selectedProjectIds = homePage?.acf?.projecten_select ?? [];
console.log("api id", selectedProjectIds)
  const {
    data: projectData,
    isLoading,
    isError,
  } = useSelectedProjecten({ id: selectedProjectIds });

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);


  if (isLoading) {
    return <p>Loading projects...</p>;
  }

  if (isError) {
    return <p>Failed to load projects.</p>;
  }

  if (!projectData || projectData.length === 0) {
    return <p>No projects found.</p>;
  }

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
            loop={projectData.length > 1}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true,
            }}
            onBeforeInit={(swiper: SwiperType) => {
              const navigation = swiper.params.navigation;
              if (typeof navigation !== "boolean" && navigation) {
                navigation.prevEl = prevRef.current;
                navigation.nextEl = nextRef.current;
              }

              const pagination = swiper.params.pagination;
              if (typeof pagination !== "boolean" && pagination) {
                pagination.el = paginationRef.current;
                pagination.clickable = true;
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
            {projectData.map((project) => {
           

              return (
                <SwiperSlide key={project.id}>
                  <div className="method-card">
                    <div className="left-part">
       {project.image && (
        <img
          src={project.image.cropped_url || project.image.url}
          alt={project.image.alt || project.title}
          width={600}
          height={400}
        />
      )}
                    
                    </div>

                    <div className="right-part">
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: project.title,
                        }}
                      />

                      <div
                        dangerouslySetInnerHTML={{
                          __html: project.excerpt,
                        }}
                      />

                      <Button link={project.slug} />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
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

              <div
                ref={paginationRef}
                className="method-dots"
              />

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
