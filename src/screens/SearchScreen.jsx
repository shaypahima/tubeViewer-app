import { View, Text, Button, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchYouTubeVideos } from '../services/fetchVideos';
import VideoItem from '../components/VideoItem';
import { useState, useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';

export default function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const [videos, setVideos] = useState([]);

  const { colors } = useContext(ThemeContext);

  // Fetch videos from YouTube API
  const { data, isLoading, error } = useQuery({
    queryKey: ['youtube-videos', keyword],
    queryFn: () => fetchYouTubeVideos(keyword),
    enabled: !!keyword
  });


  return (
    <View className="flex-1 p-4" style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>SearchScreen</Text>
      <TextInput
        className="p-3 rounded-md border shadow-sm"
        style={{
          backgroundColor: colors.background,
          borderColor: colors.secondary,
          color: colors.text,
        }}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Search videos..."
        placeholderTextColor={colors.secondary}
      />
      {isLoading && <Text style={{ color: colors.text }}>Loading...</Text>}
      {error && <Text style={{ color: colors.text }}>Error: {error.message}</Text>}
      {data && (
        <FlatList
          className='flex-1'
          contentContainerStyle={{ paddingTop: 10 }}
          keyExtractor={(item) => item.videoId}
          data={data}
          renderItem={({ item }) => <VideoItem video={item} />}
        />
      )}
    </View>
  );
}