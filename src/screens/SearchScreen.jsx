import { useState, useContext, useEffect } from "react";
import { View, Text, FlatList, TextInput, Keyboard, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useYouTubeSearch } from "../hooks/useYoutubeSearch";
import { ThemeContext } from "../contexts/themeContext";

import VideoItem from "../components/VideoItem";
import Button from "../components/UI/Button";
import Pagination from "../components/UI/Pagination";
import SearchHistory from "../components/SearchHistory";

export default function SearchScreen() {
  const { colors } = useContext(ThemeContext);

  // states
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [targetPageToken, setTargetPageToken] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  // load search history from storage once
  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem("searchHistory");
        if (storedHistory) {
          setSearchHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error("Failed to load search history", error);
      }
    };
    loadSearchHistory();
  }, []);

  // save search history whenever it changes
  useEffect(() => {
    AsyncStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // React Query: fetch data
  const {
    data,
    isLoading,
    error,
    refetch
  } = useYouTubeSearch(query, targetPageToken);

  // refetch when pagination changes, only if we have a valid query
  useEffect(() => {
    if (query.trim()) {
      refetch();
    }
  }, [targetPageToken]);

  const handleSearch = () => {
    if (!query.trim()) return;
    Keyboard.dismiss();
    refetch();
    // add to search history if not already present
    setSearchHistory((prevHistory) =>
      prevHistory.includes(query)
        ? prevHistory
        : [...prevHistory, query]
    );
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
        <ActivityIndicator size="large" color={colors.text} className="my-4 mx-5" />
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
            totalPages={data.totalPages}
            onPageChange={handlePagination}
            nextPage={data.nextPageToken}
            prevPage={data.prevPageToken}
          />
        </View>
      )}
      {!isLoading && !data?.results && (
        <SearchHistory
          searchHistory={searchHistory}
          onClearHistory={() => {
            setSearchHistory([]);
          }}
          onSearchHistoryQuery={(item) => {
            setQuery(item);
            handleSearch(item);
          }}
        />
      )}
    </View>
  );
}