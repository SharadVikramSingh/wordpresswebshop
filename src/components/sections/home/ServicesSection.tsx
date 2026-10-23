
"use client";

import { useHomePage } from "@/hooks/useHomePage";
import { useDienstenPost } from "@/hooks/useDienstenPost";
import type {
  ServicesAcfTypes,
  ServicesPostTypes,
} from "@/types/wordpress";

import {
  getInternalPath,
  decodeHtmlEntities,
} from "../../../helper/helperFunction";

function ServicesSection() {
  const {
    data: servicesData,
    isPending: servicesPending,
    isError: servicesError,
  } = useDienstenPost();

  const {
    data: homeData,
    isPending: homePending,
    isError: homeError,
  } = useHomePage();

  if (servicesPending || homePending) {
    return <p>Loading services...</p>;
  }

  if (servicesError || homeError) {
    return <p>Failed to load services.</p>;
  }

  if (
    !servicesData ||
    !Array.isArray(servicesData) ||
    servicesData.length === 0 ||
    !homeData
  ) {
    return null;
  }

  const {
    services_sub_title,
    services_title,
    services_top_text,
  } = (homeData.acf ?? {}) as ServicesAcfTypes;

  return (
    <section className="our-service">
      <div className="wrapper">
        <div className="top-title">
          {services_sub_title && (
            <div className="sub-title">
              {decodeHtmlEntities(services_sub_title)}
            </div>
          )}

          {services_title && (
            <h2>{decodeHtmlEntities(services_title)}</h2>
          )}

          {services_top_text && (
            <p>{decodeHtmlEntities(services_top_text)}</p>
          )}
        </div>

        <div className="inner-card">
          {servicesData.map((service: ServicesPostTypes) => {
            const title = service.title?.rendered;
            const shortText = service.acf?.short_text;
            const serviceLink =
              service.acf?.link || service.link || "#";

            return (
              <div className="service-card" key={service.id}>
                <div className="text-wrap">
                  {title && (
                    <h3>{decodeHtmlEntities(title)}</h3>
                  )}

                  {shortText && (
                    <p>{decodeHtmlEntities(shortText)}</p>
                  )}
                </div>

                <div className="btn-flx">
                  <a
                    href={
                      serviceLink === "#"
                        ? "#"
                        : getInternalPath(serviceLink)
                    }
                    className="btn_one trp"
                    target="_self"
                  >
                    Meer over webshops

                    <span className="arrow">
                      <svg
                        width={21}
                        height={21}
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="arrow-fill"
                          d="M0.898589 19.5366L19.5366 0.898561M19.5366 10.2176V0.898561H10.2176"
                          stroke="#1A5C38"
                          strokeWidth="1.79715"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
