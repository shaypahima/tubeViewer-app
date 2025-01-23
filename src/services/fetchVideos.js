import axios from 'axios';
import { config } from '../../config';


export const fetchYouTubeVideos = async (keyword) => {
  try {
    console.log(config.BASE_URL)
    const response = await axios.get(config.BASE_URL, {
      params: {
        key: config.API_KEY,
        q: keyword,
        part: 'snippet',
        type: 'video',
        maxResults: 10
      }
    })
    
    const videos = response.data.items;

    // Map video details into a readable format
    return videos.map((video) => ({
      title: video.snippet.title,
      description: video.snippet.description,
      videoId: video.id.videoId,
      thumbnail: video.snippet.thumbnails.high.url,
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }

}