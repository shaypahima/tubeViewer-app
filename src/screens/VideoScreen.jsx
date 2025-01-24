import { View, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";
import { useNavigation } from "@react-navigation/native";
import VideoPlayer from "../components/VideoPlayer";


export default function VideoScreen({ route }) {
  const { colors } = useContext(ThemeContext);
  const { video } = route.params;
  const { title, description, videoId } = video;
  const navigation = useNavigation();

  // Check for missing parameters and navigate back if any are missing
  if (!title || !videoId) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text style={{ color: colors.text }}>Video not found!</Text>
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          variant="secondary"
        />
      </View>
    );
  }

  console.log(video);
  return (
    <View
      className="flex-1"
      style={{ backgroundColor: colors.secondary }}
    >
      <Text className="text-2xl font-bold my-6 mx-2" style={{ color: colors.text }}>
        {title}
      </Text>
      <VideoPlayer videoId={videoId} />
      <Text className="text-lg font-bold mb-4" style={{ color: colors.text }}>
        Description
      </Text>
      <Text className="text-sm mb-4" style={{ color: colors.text }}>
        {description}
      </Text>
    </View>
  );
}
