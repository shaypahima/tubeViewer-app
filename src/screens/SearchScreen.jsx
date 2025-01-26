import { useState, useContext, useEffect } from "react";
import { View, Text, FlatList, TextInput, Keyboard } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchYouTubeVideos } from "../services/fetchVideos";
import { ThemeContext } from "../contexts/themeContext";

import VideoItem from "../components/VideoItem";
import Button from "../components/UI/Button";
import Pagination from "../components/UI/Pagination";

export default function SearchScreen() {
  const { colors } = useContext(ThemeContext);
  
  // states
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [targetPageToken, setTargetPageToken] = useState(null);

  // fetch data
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["search-results", query, targetPageToken],
    queryFn: fetchYouTubeVideos,
    enabled: false, // disable automatic fetching
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // re-fetch when pagination changes
  useEffect(() => {
    // only refetch if we actually have a query
    if (query.trim()) {
      refetch();
    }
  }, [targetPageToken]);

  // handle search
  const handleSearch = () => {
    Keyboard.dismiss();
    if (query.trim()) {
      refetch();
    }
  };

  // handle pagination
  const handlePagination = (direction) => {
    if (direction === "next" && data?.nextPageToken) {
      setCurrentPage((prevPage) => prevPage + 1);
      setTargetPageToken(data.nextPageToken);
    } else if (direction === "prev" && data?.prevPageToken && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setTargetPageToken(data.prevPageToken);
    }
  };

  // handle errors
  if (error) {
    return (
      <View
        style={{ backgroundColor: colors.background }}
        className="flex-1 justify-center items-center"
      >
        <View className="flex-1 p-4">
          <Text
            style={{ color: colors.text }}
            className="p-4 text-lg font-bold"
          >
            Something went wrong...
          </Text>
          <Text style={{ color: colors.text }} className="items-start">
            {error.message}
          </Text>
          <Button
            title="Try Again"
            onPress={() => {
              setQuery("");
              refetch();
            }}
            variant="secondary"
            disabled={isLoading}
            className="my-4 mx-5"
          />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: colors.secondary }}>
      <View
        className="flex-row items-center p-2 mt-4 rounded-lg shadow-md"
        style={{
          backgroundColor: colors.background,
          color: colors.text,
        }}
      >
        <TextInput
          className="flex-1 p-3 text-base rounded-l-lg"
          returnKeyType="search"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          placeholder="Search"
          placeholderTextColor={colors.text}
          style={{ color: colors.text }}
        />
        <Button
          title="Search"
          onPress={handleSearch}
          variant="secondary"
          disabled={isLoading}
        />
      </View>

      {isLoading && (
        <Text
          className="text-center text-lg my-4 mx-5"
          style={{ color: colors.text }}
        >
          Loading...
        </Text>
      )}

      {data?.results && (
        <View className="flex-1">
          <FlatList
            className="flex-1"
            contentContainerStyle={{ paddingTop: 10 }}
            keyExtractor={(item) => item.videoId}
            data={data.results}
            renderItem={({ item }) => (
              <VideoItem video={item} addToRecentVideos={true} />
            )}
          />

          <Pagination
            currentPage={currentPage}
            onPageChange={handlePagination}
            nextPage={data.nextPageToken}
            prevPage={data.prevPageToken}
          />
        </View>
      )}
    </View>
  );
}
