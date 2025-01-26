import { Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";
import { VideosContext } from "../contexts/videosContext";



export default function VideoItem({ video, addToRecentVideos = false }) {
  const { colors } = useContext(ThemeContext);
  // add the video to the recent videos list
  const { addRecentVideo } = useContext(VideosContext);
  // get the title and thumbnail of the video
  const { title, thumbnail } = video;

  const navigation = useNavigation();

  // if addToRecentVideos is true, add the video to the recent videos list
  const handlePress = () => {
    if(addToRecentVideos){
      addRecentVideo(video);
    }
    navigation.navigate('Video', { video }); // navigate to the video screen
  };

  return (
    <TouchableOpacity 
      activeOpacity={1}
      className="flex-row items-center  p-4 mb-1 rounded-lg"
      style={{
        backgroundColor: colors.accent,
      }}
      onPress={handlePress}
    >
      <Image
        className="w-16 h-16 rounded"
        resizeMode="cover"
        source={{ uri: thumbnail }}
        style={{
          backgroundColor: colors.secondary,
        }}
      />
      <Text
        className="ml-4 text-lg font-medium w-3/4"
        style={{
          color: colors.text,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
