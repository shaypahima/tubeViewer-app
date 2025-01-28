import { useContext } from "react";
import { VideosContext } from "../contexts/videosContext";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../contexts/themeContext";
import config from "../../config.json";

export default function VideoItemActions({
  recentVideos,
  isFavorite,
  video,
  rowMap,
}) {
  const { colors } = useContext(ThemeContext);
  const { addFavorite, deleteFavorite, deleteRecentVideo, favorites } =
    useContext(VideosContext);

  const favoritesFull = favorites.length >= config.MAX_FAVORITE;

  const handleCloseRow = () => {
    rowMap[video.videoId].closeRow();
  };

  

  return (
    <View className="flex-row justify-between space-x-4">
      <TouchableOpacity
        disabled={favoritesFull && !isFavorite}
        onPress={() => {
          handleCloseRow();
          isFavorite ? deleteFavorite(video.videoId) : addFavorite(video);
          rowMap[video.videoId].closeRow();
        }}
        style={{
          backgroundColor: isFavorite ? colors.disabled : colors.success,
        }}
        className="rounded-md "
      >
        <Text className="p-4">
          {" "}
          {
            <Ionicons
              name={isFavorite ? "heart-dislike" : "heart"}
              size={52}
              className="w-56 h-56"
              color="white"
            />
          }{" "}
        </Text>
      </TouchableOpacity>
      {/* when the item location is in recent videos, add the trash icon */}
      {recentVideos && (
        <TouchableOpacity
          onPress={() => {
            handleCloseRow();
            deleteRecentVideo(video.videoId);
            rowMap[video.videoId].closeRow();
          }}
          style={{ backgroundColor: colors.alert }}
          className="rounded-md "
        >
          <Text className="p-4">
            {<Ionicons name="trash" size={52} color="white" />}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
