import { View } from "react-native";

export default function Stack({direction="row",scrollable=false, children, className=""}){
  const directionClass = direction === "row" ? "flex-row" : "flex-col";
  return(
    <View className={`flex ${directionClass} ${className}`}>
      {children}
    </View>
  )
}
