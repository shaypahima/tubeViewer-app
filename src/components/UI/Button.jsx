import { Text, TouchableOpacity } from 'react-native';

export default function Button({
   title, onPress, variant = 'primary', disabled = false 
  }) {
  const buttonStyles = `px-4 py-2 rounded-lg ${
    variant === 'primary'
      ? 'bg-blue-500' 
      : variant === 'secondary'
      ? 'bg-gray-500'
      : 'bg-green-500'
  } ${disabled ? 'opacity-50' : ''}`;
  const textStyles = 'text-white font-bold text-center';


  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} className={buttonStyles}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  )
}
