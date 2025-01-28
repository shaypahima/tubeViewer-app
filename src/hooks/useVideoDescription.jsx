import { useQuery } from "@tanstack/react-query";
import { fetchVideoDescription } from "../services/fetchVideoDescription";

export function useVideoDescription(videoId) {
  return useQuery({
    queryKey: ["video-description", videoId],
    queryFn: fetchVideoDescription,
    enabled: false,
  });
}