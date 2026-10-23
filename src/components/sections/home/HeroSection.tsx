
"use client";
import { useHomePage } from "@/hooks/useHomePage";
import type { HeroTypes } from "@/types/wordpress";
import Button from "../../ui/Button";

import {getInternalPath} from "../../../helper/helperFunction"

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
    hero_counter,
    hero_image,
  } = (data.acf ?? {}) as unknown as HeroTypes;




  return (
    <section className="banner_sec mb-120">
      <div className="wrapper">
        <div className="inner_part">
          <div className="left_part">

            <div className="text-box">

              {hero_subtitle && <div className="sub-title"><img src="/wordpress-logo.svg" alt="wordpress-logo" />{hero_subtitle}</div>}
              {hero_title && <h1 className="animated-title">{hero_title}</h1>}
              {hero_content && <p>{hero_content}</p>}
              
            </div>

            <div className="btn-flx">
              {hero_link_one && <Button  link={getInternalPath(hero_link_one.url)} target={hero_link_one.target ? hero_link_one.target : "_self"} >{hero_link_one.title} </Button>}
              {hero_link_two && <Button  buttonClass="trp" link={getInternalPath(hero_link_two.url)} target={hero_link_two.target ? hero_link_two.target : "_self"} >{hero_link_two.title} </Button>}
            </div>
            
            {hero_counter && <div className="counter-box">
              {hero_counter?.map((counter, index) => (
                <div className="counter-card" key={`count-${index}`}>
                  <strong className="count-number">
                    <span className="counter">{counter.count_number}</span>
                    {counter.counter_title_prefix}
                  </strong>

                  <p>{counter.counter_title}</p>
                </div>
              ))}
                              
              
            </div>}
          </div>
          <div className="right_part">

            {hero_image && <img src={hero_image.sizes?.hero_image} alt={hero_image.alt? hero_image.alt : "image"} />}

          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection;