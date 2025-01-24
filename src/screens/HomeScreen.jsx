import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';
import Button from '../components/UI/Button';
import { VideosContext } from '../contexts/videosContext';
import VideoItem from '../components/VideoItem';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  // get the recent videos from the videos context
  const { recentVideos } = useContext(VideosContext);

  return (
    <View className="flex-1 " style={{ backgroundColor: colors.background }}>
      <Text className="text-center text-2xl font-bold my-4 mx-5" style={{ color: colors.text }}>
        Welcome to the Video Players App
      </Text>
      <Button
        className="my-6 mx-5"
        variant="primary"
        title="Search Video"
        onPress={() => navigation.navigate('Search')}
      />
      <Text className="text-2xl font-bold my-4 mx-5" style={{ color: colors.text }}>
        Recent Videos:
      </Text>
      <Text className="text-sm mb-4 mx-5" style={{ color: colors.text }}>
        {recentVideos.length} videos out of 10
      </Text>
      {/* if there are recent videos, show them in a flatlist */}
      {recentVideos.length > 0 ? (
      <FlatList
        data={recentVideos}
        contentContainerStyle={{ paddingTop: 10 }}
        className="flex-1"
        keyExtractor={(item) => item.videoId}
          renderItem={({ item }) => <VideoItem video={item} />}
        />
      ) : (
        <Text className="text-center text-lg my-4 mx-5" style={{ color: colors.text }}>
          No recent videos found.
        </Text>
      )}
    </View>
  );
}

