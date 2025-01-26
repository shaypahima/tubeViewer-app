import { View, Text, FlatList, TextInput, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { fetchYouTubeVideos } from "../services/fetchVideos";
import VideoItem from "../components/VideoItem";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/themeContext";
import Button from "../components/UI/Button";
import Pagination from "../components/UI/Pagination";

export default function SearchScreen() {
  // state to store the search data
  const [searchData, setSearchData] = useState({
    query: "",
    nextPageToken: null,
    prevPageToken: null,
    targetPageToken: null,
    currentPage: 1,
  });

  const { colors } = useContext(ThemeContext);

  // fetch the videos from the youtube api
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["search-results", searchData.query, searchData.targetPageToken],
    queryFn: () =>
      fetchYouTubeVideos(searchData.query, searchData.targetPageToken),
    enabled: false, // disable automatic fetching
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // handle the search
  const handleSearch = () => {
    Keyboard.dismiss();
    if (searchData.query.trim()) {
      setSearchData({
        ...searchData,
        currentPage: 1,
        nextPageToken: null,
        prevPageToken: null,
        targetPageToken: null,
      });
      console.log(searchData, "searchData");
      console.log(data, "data");
      refetch();
    }
  };

  // handle the pagination
  const handlePagination = (direction) => {
    if (direction === "next" && searchData.nextPageToken) {
      setSearchData({
        ...searchData,
        currentPage: searchData.currentPage + 1,
        targetPageToken: searchData.nextPageToken,
      });
    }
    if (direction === "prev" && searchData.prevPageToken) {
      setSearchData({
        ...searchData,
        currentPage: searchData.currentPage - 1,
        targetPageToken: searchData.prevPageToken,
      });
    }
    refetch();
  };
  console.log({...error}.message, "error");
  if (error) {
    return (
      <View
        style={{ backgroundColor: colors.secondary }}
        className="flex-1 justify-center items-center "
      >
        <View className="flex-1 p-4" >
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
            onPress={() => setSearchData({ ...searchData, query: "" })}
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
          value={searchData.query}
          onChangeText={(text) => setSearchData({ ...searchData, query: text })}
          onSubmitEditing={() => handleSearch(searchData.query)}
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
            currentPage={searchData.currentPage}
            onPageChange={handlePagination}
          />
        </View>
      )}
    </View>
  );
}
