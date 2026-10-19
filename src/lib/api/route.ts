
import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = process.env.WORDPRESS_API_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { message: "WordPress API URL is not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${apiUrl}/wp/v2/pages/9?acf_format=standard`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch WordPress Home page" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Unable to connect to WordPress" },
      { status: 502 }
    );
  }
}
