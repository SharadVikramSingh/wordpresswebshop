
"use client";

import { useQuery } from "@tanstack/react-query";
import { getDienstenPost } from "@/lib/api/home";

export function useDienstenPost() {
  return useQuery({
    queryKey: ["diensten-post"],
    queryFn: getDienstenPost,
    // staleTime: 5 * 60 * 1000,
  });
}
