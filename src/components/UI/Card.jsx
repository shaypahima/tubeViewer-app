import { View,Text,Image } from "react-native";

export default function Card({image, title, description, className=""}){
  return(
    <View className={`flex-1 bg-white shadow-md rounded-lg p-4 m-2 ${className}`}>
      {image && <Image source={image} className="w-full h-40 rounded-lg" />}
      {title && <Text className="text-lg font-bold mb-2">{title}</Text>}
      {description && <Text className="text-sm text-gray-500 mb-4">{description}</Text>}
    </View>
  )
}
