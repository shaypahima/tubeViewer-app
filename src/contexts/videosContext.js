import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  const [recentVideos, setRecentVideos] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // load videos from AsyncStorage when the component mounts
  useEffect(() => {
    const loadStoredVideos = async () => {
      try {
        const recentVideosFromStorage = await AsyncStorage.getItem('recentVideos');
        const favoriteVideosFromStorage = await AsyncStorage.getItem('favorites');

        if (recentVideosFromStorage) {
          setRecentVideos(JSON.parse(recentVideosFromStorage));
        }
        if (favoriteVideosFromStorage) {
          setFavorites(JSON.parse(favoriteVideosFromStorage));
        }
      } catch (error) {
        console.error("Failed to load videos from storage", error);
      }
    };

    loadStoredVideos();
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

  // save favorites to AsyncStorage whenever they change
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites to storage", error);
      }
    };

    saveFavorites();
  }, [favorites]);

  // add a video to the recent videos
  const addRecentVideo = (video) => {
    setRecentVideos((prevVideos) => {
      const updatedVideos = [...prevVideos, video];
      return updatedVideos.slice(0, 10);
    });
  };

  // delete a recent video
  const deleteRecentVideo = (videoId) => {
    console.log("deleteRecentVideo", videoId);
    setRecentVideos((prevVideos) => {
      const updatedVideos = prevVideos.filter((video) => video.videoId !== videoId);
      return updatedVideos
    });
  };

  // delete all recent videos
  const deleteAllRecentVideos = () => {
    setRecentVideos([]);
  };

  // add a video to the favorites
  const addFavorite = (video) => {
    setFavorites((prevFavorites) => [...prevFavorites, video]);
  };

  // delete a favorite
  const deleteFavorite = (videoId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((video) => video.videoId !== videoId);
      return updatedFavorites;
    });
  };


  return <VideosContext.Provider value={{
    recentVideos,
    favorites,
    addFavorite,
    deleteFavorite,
    addRecentVideo,
    deleteRecentVideo,
    deleteAllRecentVideos,
  }}>{children}</VideosContext.Provider>;
};


