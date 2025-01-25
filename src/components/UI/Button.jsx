import { Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../contexts/themeContext";
import { useContext } from "react";

export default function Button({
  className,
  title,
  onPress,
  variant = "primary",
  disabled = false,
}) {
  const { colors } = useContext(ThemeContext);

  // get the background color based on the variant
  const getBackgroundColor = () => {
    if (disabled) return colors.secondary;
    switch (variant) {
      case "primary":
        return colors.primary;
      case "secondary":
        return colors.secondary;
      default:
        return colors.accent;
    }
  };

  return (
    <TouchableOpacity

      onPress={onPress}
      disabled={disabled}
      className={`px-4 py-2 bg-${getBackgroundColor()} ${
        disabled ? "opacity-50" : ""
      } border border-${getBackgroundColor()} rounded-lg ${className}`}
    >
      <Text className="font-bold text-center" style={{ color: colors.text }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
