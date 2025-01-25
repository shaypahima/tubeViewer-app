import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, forwardRef} from "react";
import { ThemeContext } from "../contexts/themeContext";
import Button from "../components/UI/Button";
import { VideosContext } from "../contexts/videosContext";
import VideoItem from "../components/VideoItem";
import { SwipeListView } from "react-native-swipe-list-view";



export default function HomeScreen() {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  // get the recent videos from the videos context and the deleteAllVideos function
  const { recentVideos, deleteAllVideos } = useContext(VideosContext);

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
      <View className="flex-row p-3 justify-between">
        <Text
          className="text-2xl font-bold mx-5"
          style={{ color: colors.text }}
        >
          Recent Videos:
        </Text>
        <TouchableOpacity
          className="mt-2 mr-7"
          onPress={() => deleteAllVideos()}
        >
          <Text style={{ color: colors.text }}>Clear all</Text>
        </TouchableOpacity>
      </View>
      {/* if there are recent videos, show them in a flatlist */}
      {recentVideos.length > 0 ? (
        <SwipeListView
          data={recentVideos}
          renderItem={(data) => <VideoItem video={data.item} />}
          renderHiddenItem={() => <View className="flex-row items-center space-x-4 p-4 border-b " style={{ backgroundColor: colors.background }}></View>}

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
