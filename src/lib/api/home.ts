
import type { HeroTypes } from "@/types/wordpress";
import type { ProjectenPost } from "@/types/wordpress";
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export interface HomePage {
  id: number;

  title: {
    rendered: string;
  };

  content: {
    rendered: string;
  };

  acf?: Record<string, unknown> & {
    projecten_select?: number[];
  };

  projecten_category?: number[];
}


export async function getHomePage(): Promise<HomePage> {
  // console.log("API URL:", API_URL);
  

  if (!API_URL) {
    throw new Error("WORDPRESS_API_URL is not configured");
  }

  const url = `${API_URL.replace(/\/$/, "")}/wp/v2/pages/9?acf_format=standard`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  // console.log("Response status:", response.status);

  const data = await response.json();

  // console.log("Full homepage response:", data);

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status}`);
  }

  return data as HomePage;
}


export interface dienstenPost {
    id: number;
    date: string;
    date_gmt: string;
    slug: string;
    link: string;

    title: {
      rendered: string;
    };

    content: {
      rendered: string;
    };

    excerpt: {
      rendered: string;
    };

    acf?: Record<string, unknown>;
}

export async function getDienstenPost(): Promise<dienstenPost[]> {
  // console.log("API URL:", API_URL);

  if (!API_URL) {
    throw new Error("WORDPRESS_API_URL is not configured");
  }

  const url = `${API_URL.replace(/\/$/, "")}/wp/v2/diensten`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  // console.log("Response status:", response.status);

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status}`);
  }

  const data: dienstenPost[] = await response.json();

  // console.log("Full diensten response:", data);

  return data;
}




export async function getProjectenPost(
  ids: number[]
): Promise<ProjectenPost[]> {
 

  if (!API_URL) {
    throw new Error("WordPress API URL is missing");
  }

  const url = `${API_URL.replace(/\/+$/, "")}/site/v1/projecten?include=${ids.join(",")}&_embed`;

  // console.log("Fetching projects from:", url);

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error("WordPress API error:", response.status, errorText);

    throw new Error(`WordPress API failed: ${response.status}`);
  }

  return response.json();
}



export interface WordPressPost {
  date: string | number | Date;
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: {
    id: number;
    url: string;
    cropped_url: string | null;
    alt: string;
  } | null;
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
}

interface GetPostsOptions {
  perPage?: number;
  include?: number[];
}

export async function getPosts({
  perPage = 3,
  include,
}: GetPostsOptions = {}): Promise<WordPressPost[]> {
  if (!API_URL) {
    throw new Error("WORDPRESS_API_URL is not configured");
  }
  const url = new URL(`${API_URL}/site/v1/posts`);
  url.searchParams.set("per_page", String(perPage));
  if (include?.length) {
    url.searchParams.set("include", include.join(","));
  }
  const response = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`);
  }
  return response.json();
}





