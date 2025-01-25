import { View, Text, FlatList, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { fetchYouTubeVideos } from "../services/fetchVideos";
import VideoItem from "../components/VideoItem";
import { useState, useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";
import Button from "../components/UI/Button";


export default function SearchScreen() {
  const [keyword, setKeyword] = useState("");
  const { colors } = useContext(ThemeContext);

  // fetch the videos from the youtube api
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["search-results", keyword],
    queryFn: () => fetchYouTubeVideos(keyword),
    enabled: false, // disable automatic fetching
  });

  // handle the search
  const handleSearch = (query) => {
    if (query.trim()) {
      setKeyword(query);
      refetch();
    }
  };

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: colors.background }}>
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
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={() => handleSearch(keyword)}
          placeholder="Search"
          placeholderTextColor={colors.text}
          style={{ color: colors.text }}
        />
        <Button
          title="Search"
          onPress={() => handleSearch(keyword)}
          variant="secondary"
        />
      </View>

      {isLoading && <Text className="text-center text-lg my-4 mx-5" style={{ color: colors.text }}>Loading...</Text>}
      {error && (
        <View className="mb-4">
          <Text style={{ color: colors.text }}>Error: {error.message}</Text>
          <Button
            title="Try Again"
            onPress={() => setKeyword("")}
            variant="secondary"
            disabled={isLoading}
          />
        </View>
      )}
      {data && (
        <FlatList
          className="flex-1"
          contentContainerStyle={{ paddingTop: 10 }}
          keyExtractor={(item) => item.videoId}
          data={data}
          renderItem={({ item }) => <VideoItem video={item} addToRecentVideos={true} />}
        />
      )}
    </View>
  );
}
