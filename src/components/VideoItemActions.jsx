import { useContext } from "react";
import { VideosContext } from "../contexts/videosContext";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function VideoItemActions({ data, isFavorite, video, rowMap }) {

  const handleCloseRow = () => {
    rowMap[video.videoId].closeRow();
  }
  const { addFavorite, deleteFavorite, deleteRecentVideo,favorites } = useContext(VideosContext);
  const isFavoritesFull = favorites.length >= 10;

  if(isFavorite){
    return(
      <View className="flex-row justify-end space-x-4">
        <TouchableOpacity onPress={() => {
          handleCloseRow()
          deleteFavorite(video.videoId)
          rowMap[video.videoId].closeRow()
        }} className="bg-gray-500 rounded-md " >
          <Text className='p-4'> {<Ionicons name="heart-dislike" size={52} className="w-56 h-56" color="white" />} </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return(
    <View className="flex-row justify-between space-x-4">
      <TouchableOpacity disabled={isFavoritesFull} onPress={() => {
        handleCloseRow() 
        addFavorite(video)
        
        }} className="bg-blue-500 rounded-md " >
        <Text className='p-4'> {<Ionicons name="heart" size={52} className="w-56 h-56" color="white" />} </Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={() => {
        handleCloseRow() 
        deleteRecentVideo(video.videoId)
        rowMap[video.videoId].closeRow()
      }}
      className="bg-red-500 rounded-md " >
        <Text className='p-4'>{<Ionicons name="trash" size={52} color="white" />}</Text>
      </TouchableOpacity>
    </View>
  )
}