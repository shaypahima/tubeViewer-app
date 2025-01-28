import axios from 'axios';
import config from '../../config.json';

export const fetchVideoDescription = async ({queryKey}) => {
  try {
    const [_, videoId] = queryKey
    const params = {
      id: videoId,
      key: config.API_KEY,
      part: 'snippet', // 'snippet' contains the description
    }
    
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: params  
    });


    // if the call succeeds, response.data.items should contain an array with one item for the given ID
    const videoItems = response.data.items || [];
    if (videoItems.length > 0) {
      // return the full description
      return videoItems[0].snippet.description;
    }
    
    // if no items, possibly invalid or private video
    return null;
  } catch (error) {
    console.error('Error fetching video description:', error);
    throw error;
  }
};