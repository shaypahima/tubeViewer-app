import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";

import { ThemeContext } from "../contexts/themeContext";
import { VideosContext } from "../contexts/videosContext";

import VideoItem from "../components/VideoItem";
import VideoItemActions from "../components/VideoItemActions";
import Button from "../components/UI/Button";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  // get the recent videos from the videos context and the deleteAllVideos function
  const { recentVideos, favorites, deleteAllRecentVideos } =
    useContext(VideosContext);

  return (
    <View className="flex-1 " style={{ backgroundColor: colors.background }}>
      <Text
        className="text-center text-2xl font-bold my-4 mx-5"
        style={{ color: colors.text }}
      >
        Welcome to the Video Players App
      </Text>
      <Button
        className="my-6 mx-5"
        variant="primary"
        title="Search Video"
        onPress={() => navigation.navigate("Search")}
      />

      <Text className="text-2xl font-bold mx-8" style={{ color: colors.text }}>
        My Favorites:
      </Text>
      {favorites.length > 0 ? (
        <View className="max-h-60">
          <SwipeListView
            scrollEnabled={favorites.length > 2 ? true : false}
            closeOnRowPress={true}
            keyExtractor={(item) => item.videoId}
            data={favorites}
            renderItem={(data) => <VideoItem video={data.item} />}
            leftOpenValue={85}
            renderHiddenItem={(data, rowMap) => (
              <VideoItemActions
                data={data}
                rowMap={rowMap}
                video={data.item}
                isFavorite={true}
              />
            )}
          />
        </View>
      ) : (
        <>
          <Text
            className="text-start text-lg my-2 mx-7"
            style={{ color: colors.text }}
          >
            No favorites videos.
          </Text>
          <Text
            className="text-start text-lg mx-7"
            style={{ color: colors.text }}
          >
            Add by clicking the heart icon in the video page.
          </Text>
          <Text
            className="text-start text-lg mx-7"
            style={{ color: colors.text }}
          >
            or by swiping right on the video in the recent videos section.
          </Text>
        </>
      )}

      <View className="flex-row p-3 justify-between">
        <Text
          className="text-2xl font-bold mx-5"
          style={{ color: colors.text }}
        >
          Recent Videos:
        </Text>
        <TouchableOpacity
          className="mt-2 mr-7"
          onPress={() => deleteAllRecentVideos()}
        >
          <Text className="underline" style={{ color: colors.text }}>
            Clear all
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mx-5 px-3">
        <Text className="p-3" style={{ color: colors.text }}>
          Recent 10 videos that you have watched
        </Text>
      </View>
      {recentVideos.length > 0 ? (
        <SwipeListView
          rightOpenValue={-80}
          leftOpenValue={85}
          keyExtractor={(item) => item.videoId}
          data={recentVideos}
          renderItem={(data) => <VideoItem video={data.item} />}
          renderHiddenItem={(data, rowMap) => (
            <VideoItemActions
              recentVideos={true}
              rowMap={rowMap}
              video={data.item}
              isFavorite={favorites.some(
                (favorite) => favorite.videoId === data.item.videoId
              )}
            />
          )}
        />
      ) : (
        <Text
          className="text-center text-lg my-4 mx-5"
          style={{ color: colors.text }}
        >
          No recent videos found.
        </Text>
      )}
    </View>
  );
}
