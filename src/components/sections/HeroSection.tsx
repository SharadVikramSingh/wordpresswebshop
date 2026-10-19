
"use client";
import { useHomePage } from "@/hooks/useHomePage";
import Button from "../ui/Button";

import {getInternalPath} from "../../../helper/helperFunction"

interface HeroTypes {
  hero_subtitle: string;
  hero_title: string;
  hero_content: string;
  hero_link_one: {
    title: string;
    url: string;
    target: string;
    } | null;

    hero_link_two: {
    title: string;
    url: string;
    target: string;
    } | null;
    
}

function HeroSection(){
 const { data, isPending, isError } = useHomePage();

  // if (isPending) return <p>Loading homepage...</p>;
  // if (isError) return <p>Failed to load homepage.</p>;
  if (!data) return null;

const {
  hero_subtitle,
  hero_title,
  hero_content,
  hero_link_one,
  hero_link_two,
} = (data.acf ?? {}) as unknown as HeroTypes;




    return (
      <section className="banner_sec mb-120 123">
        <div className="wrapper">
          <div className="inner_part">
            <div className="left_part">
              <div className="text-box">

                {hero_subtitle && <div className="sub-title"><img src="http://localhost/wordpresswebshop/wp-content/uploads/2026/10/wordpress-logo.svg" alt="wordpress-logo" />{hero_subtitle}</div>}
                {hero_title && <h1 className="animated-title">{hero_title}</h1>}
                {hero_content && <p>{hero_content}</p>}
               
              </div>
              <div className="btn-flx">
                {hero_link_one && <Button  link={getInternalPath(hero_link_one.url)} target={hero_link_one.target ? hero_link_one.target : "_self"} >{hero_link_one.title} </Button>}
                {hero_link_two && <Button  buttonClass="trp" link={getInternalPath(hero_link_two.url)} target={hero_link_two.target ? hero_link_two.target : "_self"} >{hero_link_two.title} </Button>}
              </div>
              <div className="counter-box">
                <div className="counter-card">
                  <strong className="count-number">
                    <span className="counter">150</span>
                    +                          </strong>
                  <p>Webshops live</p>
                </div>
                <div className="counter-card">
                  <strong className="count-number">
                    <span className="counter">10</span>
                    +                          </strong>
                  <p>Jaar ervaring</p>
                </div>
                <div className="counter-card">
                  <strong className="count-number">
                    <span className="counter">98</span>
                    %                          </strong>
                  <p>Tevreden klanten</p>
                </div>
              </div>
            </div>
            <div className="right_part">
              <img width={547} height={520} src="http://localhost/wordpresswebshop/wp-content/uploads/2026/10/hero-img1.jpg" className="attachment-hero-image size-hero-image" alt="" loading="lazy" decoding="async" srcSet="http://localhost/wordpresswebshop/wp-content/uploads/2026/10/hero-img1.jpg 547w, http://localhost/wordpresswebshop/wp-content/uploads/2026/10/hero-img1-300x285.jpg 300w" sizes="auto, (max-width: 547px) 100vw, 547px" />                     
            </div>
          </div>
        </div>
      </section>
    )
}

export default HeroSection;