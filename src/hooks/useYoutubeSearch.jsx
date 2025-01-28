import { useQuery } from "@tanstack/react-query";
import { fetchYouTubeVideos } from "../services/fetchVideos";

export function useYouTubeSearch(query, targetPageToken) {
  return useQuery({
    queryKey: ["search-results", query, targetPageToken],
    queryFn: fetchYouTubeVideos,
    enabled: false,
    staleTime: 1000 * 60 * 5,
  });
}