import axios from 'axios';
import { config } from '../../config';


export const fetchYouTubeVideos = async ({queryKey}) => {
  const [_, query, pageToken] = queryKey

  try {
    const params = {
      key: config.API_KEY,
      q: query,
      part: 'snippet',
      type: 'video',
      maxResults: 10,
    }
    if(pageToken){
      params.pageToken = pageToken;
    }

    // fetch the videos from the youtube api
    const response = await axios.get(config.BASE_URL, {
      params: params
    })
    
    const videos = response.data.items;

    // map video details into a readable format
    return {
      results: videos.map((video) => ({
        title: video.snippet.title,
        description: video.snippet.description,
        videoId: video.id.videoId,
        thumbnail: video.snippet.thumbnails.high.url,
      })),
      nextPageToken: response.data.nextPageToken,
      prevPageToken: response.data.prevPageToken
    };
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    throw error;
  }

}