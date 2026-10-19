
"use client";

import { useQuery } from "@tanstack/react-query";
import { getHomePage } from "@/lib/api/home";

export function useHomePage() {
  return useQuery({
    queryKey: ["home-page"],
    queryFn: getHomePage,
    // staleTime: 5 * 60 * 1000,
  });
}
