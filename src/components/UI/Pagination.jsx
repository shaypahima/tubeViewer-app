import { View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function Pagination({
  currentPage,
  onPageChange,
  nextPage,
  prevPage,
  totalPages
}) {
  const { colors } = useContext(ThemeContext);
  return (
    <View className="flex-row justify-around items-around p-4">
      <TouchableOpacity
        disabled={!prevPage}
        onPress={() => onPageChange("prev")}
        className="p-2 rounded-md"
        style={{
          backgroundColor: !prevPage ? colors.disabled : colors.primary,

        }}
      >
        <MaterialIcons
          name="keyboard-arrow-left"
          size={24}
          color={colors.text}
        />
      </TouchableOpacity>
      <Text
        style={{ color: colors.text }}
        className="text-center text-2xl font-bold p-2"
      >
        {currentPage} / {totalPages}
      </Text>
      <TouchableOpacity
        disabled={!nextPage}
        onPress={() => onPageChange("next")}
        className="p-2 rounded-md"
        style={{
          backgroundColor: !nextPage ? colors.disabled : colors.primary,
        }}
      >
        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          color={colors.text}
        />
      </TouchableOpacity>
    </View>
  );
}
