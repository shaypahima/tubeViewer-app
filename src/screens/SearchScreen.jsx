import { View, Text, Button, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchYouTubeVideos } from '../services/fetchVideos';
import VideoItem from '../components/VideoItem';
import { useState } from 'react';

export default function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const [videos, setVideos] = useState([]);

  // Fetch videos from YouTube API
  const { data, isLoading, error } = useQuery({
    queryKey: ['youtube-videos', keyword],
    queryFn: () => fetchYouTubeVideos(keyword),
    enabled: !!keyword
  })

  
  const handleSearch = async () => {
    const fetchedVideos = await fetchYouTubeVideos(keyword);
    setVideos(fetchedVideos);
  }


  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text>SearchScreen</Text>
      <TextInput
        className="bg-white p-3 rounded-md border border-gray-300 shadow-sm text-gray-800"
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Search videos..."
      />
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {data && <FlatList
        className="flex-1"
        contentContainerStyle={{ paddingTop: 10 }}
        keyExtractor={(item) => item.videoId}
        data={data}
        renderItem={({ item }) => (
          <VideoItem video={item} />
        )}
      />}
    </View>
  )
}