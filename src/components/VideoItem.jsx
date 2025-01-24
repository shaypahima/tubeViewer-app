import { Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";

export default function VideoItem({ video }) {
  const navigation = useNavigation();
  const { title, thumbnail } = video;
  const { colors } = useContext(ThemeContext);

  const handlePress = () => {
    //TODO: Navigate to the video player screen
  };

  return (
    <TouchableOpacity
      className="flex-row items-center space-x-4 p-4 border-b "
      style={{
        borderBottomColor: colors.secondary,
        backgroundColor: colors.background,
      }}
      onPress={handlePress}
    >
      <Image
        className="w-16 h-16 rounded"
        resizeMode="cover"
        source={{ uri: thumbnail }}
      />
      <Text
        className="ml-4 text-lg font-medium"
        style={{
          color: colors.text,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
