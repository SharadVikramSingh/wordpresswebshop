
import type { HeroTypes } from "@/types/wordpress";
import type { ProjectenPost } from "@/types/wordpress";
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export interface AboutPage {
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


export async function getAboutPage(): Promise<AboutPage> {
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

  return data as AboutPage;
}


