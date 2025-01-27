import { View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { config } from '../../config';


import { ThemeContext } from "../contexts/themeContext";
import { VideosContext } from "../contexts/videosContext";

import Button from "../components/UI/Button";

export default function VideoScreen({ route }) {
  const { colors } = useContext(ThemeContext);
  const { video } = route.params;
  const { title, description, videoId } = video;
  const navigation = useNavigation();
  const { favorites, addFavorite, deleteFavorite } = useContext(VideosContext);

  const favoritesFull = favorites.length >= config.MAX_FAVORITE;
  const isFavorite = favorites.some((favorite) => favorite.videoId === videoId);

  // check for missing parameters and navigate back if any are missing
  if (!title || !videoId) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text style={{ color: colors.text }}>Video not found!</Text>
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          variant="secondary"
          className="my-6 mx-5"
        />
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Text
        className="text-2xl font-bold my-6 mx-2"
        style={{ color: colors.text }}
      >
        {title}
      </Text>
      <View className="h-80 w-full">
        <YoutubePlayer height={400} videoId={videoId} />
      </View>
      <View style={{ backgroundColor: colors.accent }}>
        <Text className="text-lg font-bold m-3" style={{ color: colors.text }}>
          Description
        </Text>
        <View className="flex-row justify-between ">
          <Text
            className="text-sm mb-4 mx-2 max-w-[200px]"
            style={{ color: colors.text }}
          >
            {description.trim() === ""
              ? "No description available"
              : description}
          </Text>
          {
            favoritesFull && !isFavorite ? (
              <Text className="text-sm mb-4 mx-2 max-w-[200px]" style={{ color: colors.text }}>
                Favorite list is full. Remove a video to add a new one.
              </Text>
            ) : (
              <TouchableOpacity
                className=" rounded-full mx-10"
                disabled={favoritesFull}
                onPress={() => {
              if (isFavorite) {
                deleteFavorite(videoId);
              } else {
                addFavorite(video);
              }
            }}
          >
            <Ionicons
              name={
                isFavorite ? "heart-dislike-circle-sharp" : "heart-circle-sharp"
              }
              size={56}
              color={colors.text}
            />
          </TouchableOpacity>
            )
          }
        </View>
      </View>

      <Button
        className="my-6 mx-5"
        title="Back to the Home Screen"
        onPress={() => navigation.popTo("Home")}
        variant="secondary"
      />
    </View>
  );
}
