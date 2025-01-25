import { View, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";
import { useNavigation } from "@react-navigation/native";
import YoutubePlayer from "react-native-youtube-iframe";
import Button from "../components/UI/Button";


export default function VideoScreen({ route }) {
  const { colors } = useContext(ThemeContext);
  const { video } = route.params;
  const { title, description, videoId } = video;
  const navigation = useNavigation();

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
        <YoutubePlayer
          height={400}
          videoId={videoId}
        />
      </View>
      <Text className="text-lg font-bold m-3" style={{ color: colors.text }}>
        Description
      </Text>
      <Text className="text-sm mb-4 mx-2" style={{ color: colors.text }}>
        {description.trim() === "" ? "No description available" : description}
      </Text>
      <Button
        className="my-6 mx-5"
        title="Back to the Home Screen"
        onPress={() => navigation.popTo('Home')}
        variant="secondary"
      />
    </View>
  );
}
