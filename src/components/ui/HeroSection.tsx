
type HeroImage = {
  ID?: number;
  id?: number;
  url?: string;
  alt?: string;
  sizes?: {
    [key: string]: string | undefined;
  };
} | string | null;

type HeroLink = {
  title?: string;
  url?: string;
  target?: string;
} | null;

type HeroCounter = {
  count_number?: string | number;
  counter_title_prefix?: string;
  counter_title?: string;
};

type HeroFields = {
  hero_subtitle?: string;
  hero_title?: string;
  hero_content?: string;
  hero_link_one?: HeroLink;
  hero_link_two?: HeroLink;
  hero_counter?: HeroCounter[];
  hero_image?: HeroImage;
};

type HomeApiResponse = {
  sections?: HeroFields;
};

const API_URL = process.env.WORDPRESS_API_URL;

function getImageUrl(image?: HeroImage): string {
  if (typeof image === "string") {
    return image;
  }

  if (!image) {
    return "";
  }

  return image.sizes?.["hero-image"] || image.url || "";
}

function getImageAlt(
  image?: HeroImage,
  fallback = ""
): string {
  if (image && typeof image === "object") {
    return image.alt || fallback;
  }

  return fallback;
}

function ArrowIcon() {
  return (
    <span className="arrow">
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
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
  );
}


function HeroButton({
  link,
  transparent = false,
}: {
  link?: HeroLink;
  transparent?: boolean;
}) {
  if (!link?.url || !link?.title) {
    return null;
  }

  const frontendUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

  let buttonUrl = link.url;

  // Convert local WordPress URLs to Next.js frontend URLs.
  if (
    buttonUrl.startsWith("http://localhost/wordpresswebshop/") ||
    buttonUrl.startsWith("https://localhost/wordpresswebshop/")
  ) {
    const path = buttonUrl.replace(
      /^https?:\/\/localhost\/wordpresswebshop\/?/,
      ""
    );

    buttonUrl = `${frontendUrl}/${path}`;
  }

  const target = link.target || "_self";

  return (
    <a
      href={buttonUrl}
      className={`btn_one${transparent ? " trp" : ""}`}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {link.title}
      <ArrowIcon />
    </a>
  );
}


export default async function HeroSection() {
  if (!API_URL) {
    throw new Error(
      "WORDPRESS_API_URL is missing from .env.local"
    );
  }

  const response = await fetch(
    `${API_URL}/site/v1/home`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch hero data: ${response.status}`
    );
  }

  const page: HomeApiResponse = await response.json();
  const hero = page.sections ?? {};

  const heroImageUrl = getImageUrl(hero.hero_image);
  const counters = hero.hero_counter ?? [];

  const hasContent =
    hero.hero_subtitle ||
    hero.hero_title ||
    hero.hero_content ||
    hero.hero_link_one ||
    hero.hero_link_two ||
    counters.length > 0 ||
    heroImageUrl;

  if (!hasContent) {
    return null;
  }

  return (
    <section className="banner_sec mb-120">
      <div className="wrapper">
        <div className="inner_part">
          <div className="left_part">
            <div className="text-box">
              {hero.hero_subtitle && (
                <div className="sub-title">
                  <img
                    src="./images/wordpress-icon.svg"
                    alt="WordPress logo"
                  />
                  {hero.hero_subtitle}
                </div>
              )}

              {hero.hero_title && (
                <h1 className="animated-title">
                  {hero.hero_title}
                </h1>
              )}

              {hero.hero_content && (
                <p>{hero.hero_content}</p>
              )}
            </div>

            {(hero.hero_link_one ||
              hero.hero_link_two) && (
              <div className="btn-flx">
                <HeroButton link={hero.hero_link_one} />
                <HeroButton
                  link={hero.hero_link_two}
                  transparent
                />
              </div>
            )}

            {counters.length > 0 && (
              <div className="counter-box">
                {counters.map((counter, index) => (
                  <div
                    className="counter-card"
                    key={`${counter.counter_title || "counter"}-${index}`}
                  >
                    {counter.count_number !== undefined &&
                      counter.count_number !== "" && (
                        <strong className="count-number">
                          <span className="counter">
                            {counter.count_number}
                          </span>
                          {counter.counter_title_prefix}
                        </strong>
                      )}

                    {counter.counter_title && (
                      <p>{counter.counter_title}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="right_part">
            {heroImageUrl && (
              <img
                src={heroImageUrl}
                alt={getImageAlt(
                  hero.hero_image,
                  "Hero image"
                )}
                className="attachment-hero-image size-hero-image"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
