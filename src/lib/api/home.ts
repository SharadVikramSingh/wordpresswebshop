
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export interface HomePage {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: Record<string, unknown>;
}


export async function getHomePage(): Promise<HomePage> {
  console.log("API URL:", API_URL);
  

  if (!API_URL) {
    throw new Error("WORDPRESS_API_URL is not configured");
  }

  const url = `${API_URL.replace(/\/$/, "")}/wp/v2/pages/9?acf_format=standard`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  console.log("Response status:", response.status);

  const data = await response.json();

  console.log("Full homepage response:", data);

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
  console.log("API URL:", API_URL);

  if (!API_URL) {
    throw new Error("WORDPRESS_API_URL is not configured");
  }

  const url = `${API_URL.replace(/\/$/, "")}/wp/v2/diensten`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  console.log("Response status:", response.status);

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status}`);
  }

  const data: dienstenPost[] = await response.json();

  console.log("Full diensten response:", data);

  return data;
}
