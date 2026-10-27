"use client";
import { useHomePage } from "@/hooks/useHomePage";
import type { HeroTypes } from "@/types/wordpress";


function MethodSection(){
    const { data, isPending, isError } = useHomePage();

    // if (isPending) return <p>Loading homepage...</p>;
    // if (isError) return <p>Failed to load homepage.</p>;
    if (!data) return null;

  const {
    method_sub_title,
    method_title,
    method_top_text,
    method_card,
  } = (data.acf ?? {}) as unknown as HeroTypes;
  return (
    <section className="working-sec mb-210">
      <div className="wrapper">
        <div className="top-part">
          {method_sub_title && <div className="sub-title">{method_sub_title}</div>}
          {method_title && <h2 className="animated-title">{method_title}</h2>}
          {method_top_text && <p>{method_top_text}</p>}
        </div>

        {method_card &&<div className="inner-card">
          {method_card?.map((counter, index) => (
          <div className="working-card" key={`count-${index}`}>
            <span className="count">{index + 1}</span>
            <h3>{counter.method_card_title}</h3>
            <p>{counter.method_card_text}</p>
          </div>
          ))}
        </div>}

      </div>
    </section>
  )
}

export default MethodSection;