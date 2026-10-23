
"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectenPost } from "@/lib/api/home";

export function useSelectedProjecten({
  id,
}: {
  id: number[];
}) {
  return useQuery({
    queryKey: ["projecten-selected", id],
    queryFn: () => getProjectenPost(id),
    enabled: id.length > 0,
    // staleTime: 5 * 60 * 1000,
  });
}
