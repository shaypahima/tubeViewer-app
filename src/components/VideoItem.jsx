import { Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function VideoItem({ video }) {
  const navigation = useNavigation();
  const { title, thumbnail } = video;

  const handlePress = () => {
    //TODO: Navigate to the video player screen
  };

  return (
    <TouchableOpacity
      className="flex-row items-center space-x-4 p-4 border-b border-gray-200"
      onPress={handlePress}
    >
      <Image
        className="w-16 h-16 rounded"
        resizeMode="cover"
        source={{ uri: thumbnail }}
      />
      <Text className="text-lg font-medium text-gray-800">{title}</Text>
    </TouchableOpacity>
  );
}
