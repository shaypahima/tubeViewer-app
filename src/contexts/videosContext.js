import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  const [recentVideos, setRecentVideos] = useState([]);

  // load recent videos from AsyncStorage when the component mounts
  useEffect(() => {
    const loadRecentVideos = async () => {
      try {
        const storedVideos = await AsyncStorage.getItem('recentVideos');
        if (storedVideos) {
          setRecentVideos(JSON.parse(storedVideos));
        }
      } catch (error) {
        console.error("Failed to load recent videos from storage", error);
      }
    };

    loadRecentVideos();
  }, []);

  // save recent videos to AsyncStorage whenever they change
  useEffect(() => {
    const saveRecentVideos = async () => {
      try {
        await AsyncStorage.setItem('recentVideos', JSON.stringify(recentVideos));
      } catch (error) {
        console.error("Failed to save recent videos to storage", error);
      }
    };

    saveRecentVideos();
  }, [recentVideos]);

  // add a video to the recent videos
  const addVideo = (video) => {
    setRecentVideos((prevVideos) => {
      const updatedVideos = [video, ...prevVideos];
      return updatedVideos.slice(0, 10);
    });
  };

  // delete all videos
  const deleteAllVideos = () => {
    setRecentVideos([]);
  };

  // delete a video
  const deleteVideo = (videoId) => {
    setRecentVideos((prevVideos) => {
      const updatedVideos = prevVideos.filter((video) => video.id !== videoId);
      return updatedVideos
    });
  };

  return <VideosContext.Provider value={{ recentVideos, addVideo, deleteAllVideos, deleteVideo }}>{children}</VideosContext.Provider>;
};

