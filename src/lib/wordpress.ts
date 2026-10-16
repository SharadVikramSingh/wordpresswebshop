const API_URL = process.env.WORDPRESS_API_URL;

export type WordPressPost = {
  id: number;
  date: string;
  slug: string;
  link: string;
  status?: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

// Get the WordPress REST API base URL
function getApiUrl(): string {
  if (!API_URL) {
    throw new Error(
      "WORDPRESS_API_URL is not configured in .env.local"
    );
  }

  return API_URL.replace(/\/+$/, "");
}

// Fetch WordPress blog posts
export async function getPosts(): Promise<WordPressPost[]> {
  const url = `${getApiUrl()}/wp/v2/posts`;

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `Failed to fetch WordPress posts: ${response.status}\n` +
        `URL: ${url}\nResponse: ${errorBody}`
    );
  }

  return response.json() as Promise<WordPressPost[]>;
}

// Fetch WordPress pages
export async function getPages(): Promise<WordPressPost[]> {
  const url = `${getApiUrl()}/wp/v2/pages`;

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `Failed to fetch WordPress pages: ${response.status}\n` +
        `URL: ${url}\nResponse: ${errorBody}`
    );
  }

  return response.json() as Promise<WordPressPost[]>;
}

// Reusable function for custom WordPress REST API endpoints
export async function wpFetch<T>(path: string): Promise<T> {
  const cleanPath = path.replace(/^\/+/, "");
  const url = `${getApiUrl()}/${cleanPath}`;

  console.log("Fetching WordPress API:", url);

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `WordPress API error: ${response.status}\n` +
        `URL: ${url}\nResponse: ${errorBody}`
    );
  }

  return response.json() as Promise<T>;
}

// Fetch a WordPress page by its slug
export async function getPageBySlug(
  slug: string
): Promise<WordPressPost | null> {
  const pages = await wpFetch<WordPressPost[]>(
    `wp/v2/pages?slug=${encodeURIComponent(slug)}`
  );

  return pages.length > 0 ? pages[0] : null;
}



