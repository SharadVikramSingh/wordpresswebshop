import { OptionType, MenusResponse } from "@/types/wordpress";

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;




export async function getTHemeOption(): Promise<OptionType> {
  // console.log("API URL:", API_URL);
  

  if (!API_URL) {
    throw new Error("WORDPRESS_API_URL is not configured");
  }

  const url = `${API_URL.replace(/\/$/, "")}/site/v1/theme-settings`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  // console.log("Response status:", response.status);

  const data = await response.json();

  // console.log("Full homepage response:", data);

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status}`);
  }

  return data as OptionType;
}


export async function getMenus(): Promise<MenusResponse> {
  // console.log("API URL:", API_URL);
  

  if (!API_URL) {
    throw new Error("WORDPRESS_API_URL is not configured");
  }

  const url = `${API_URL.replace(/\/$/, "")}/custom/v1/menus`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  // console.log("Response status:", response.status);

  const data = await response.json();

  // console.log("Full homepage response:", data);

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status}`);
  }

  return data as MenusResponse;
}





