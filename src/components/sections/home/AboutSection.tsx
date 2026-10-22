
"use client";
import { useHomePage } from "@/hooks/useHomePage";
import Button from "../../ui/Button";

import {getInternalPath} from "../../../../helper/helperFunction"


interface AboutTypes {

  about_image: {
    url: string;
    alt: string;
    sizes: {
      about_image : string;
    } | null;
  } | null;
  about_sub_title: string;
  about_title: string;
  about_content: string;
  about_link: {
    title: string;
    url: string;
    target: string;
  } | null;
 
}


function AboutSection(){
   const { data, isPending, isError } = useHomePage();
  
    // if (isPending) return <p>Loading homepage...</p>;
    // if (isError) return <p>Failed to load homepage.</p>;
    if (!data) return null;
  
  const {
    about_image,
    about_sub_title,
    about_title,
    about_content,
    about_link,
  } = (data.acf ?? {}) as unknown as AboutTypes;
     return (

      <section className="over-ons mb-170">
        <div className="wrapper">
          <div className="inner-part">
            <div className="left-part">
              {about_image && (<img src={about_image.sizes?.about_image || about_image.url} alt={about_image.alt || "image"}/>)}
            </div>
            <div className="right-part">
              {about_sub_title && <div className="sub-title">{about_sub_title}</div>}
              {about_title && <h2 className="animated-title">{about_title}</h2>}
              {about_content && (
                <div dangerouslySetInnerHTML={{ __html: about_content }} />
              )}
              
              <div className="btn-flx">
              {about_link && <Button  link={getInternalPath(about_link.url)} target={about_link.target ? about_link.target : "_self"} >{about_link.title} </Button>}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default AboutSection;

