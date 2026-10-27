
/* =========================
   Shared Button Types
========================= */

export interface WordPressButton {
  title: string;
  url: string;
  target: string;
}

/* =========================
   Shared Image Types
========================= */

export interface HeroImage {
  url: string;
  alt: string;
  sizes: {
    hero_image: string;
  } | null;
}

export interface AboutImage {
  url: string;
  alt: string;
  sizes: {
    about_image: string;
  } | null;
}

/* =========================
   Hero Section Types
========================= */

export interface HeroCounter {
  count_number: number;
  counter_title_prefix: string;
  counter_title: string;
}

export interface MethodCard {
  method_card_title: string;
  method_card_text: string;
}

export interface HeroTypes {
  hero_subtitle: string;
  hero_title: string;
  hero_content: string;
  hero_link_one: WordPressButton | null;
  hero_link_two: WordPressButton | null;
  hero_counter: HeroCounter[];
  hero_image: HeroImage | null;
  method_sub_title : string;
  method_title : string;
  method_top_text : string;
  method_card: MethodCard[];
  blog_title : string;
  blog_link: WordPressButton | null;
}

/* =========================
   About Section Types
========================= */

export interface AboutTypes {
  about_image: AboutImage | null;
  about_sub_title: string;
  about_title: string;
  about_content: string;
  about_link: WordPressButton | null;
}

/* =========================
   Services Types
========================= */

export interface ServicesAcfTypes {
  services_sub_title?: string;
  services_title?: string;
  services_top_text?: string;  
}

export interface ServicesPostTypes {
  id: number;
  slug: string;
  title?: {
    rendered?: string;
  };
  link?: string;
  acf?: {
    short_text?: string;
    link?: string;
  };
}

export interface ProjectImage {
  source_url: string;
  alt_text: string;
  media_details?: {
    sizes?: {
      medium?: {
        source_url: string;
      };
      large?: {
        source_url: string;
      };
      full?: {
        source_url: string;
      };
    };
  };
}

export interface ProjectTypes {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: ProjectImage[];
  };
}

export interface ProjectenPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;

  image: {
    id: number;
    url: string;
    cropped_url: string;
    alt: string;
  } | null;

  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
}



