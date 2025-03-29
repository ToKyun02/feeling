import { useTheme } from '@/providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';

export default function ThemeToggle() {
  const { theme, colors, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 16,
      }}
      onPress={toggleTheme}
    >
      <Ionicons name={theme === 'dark' ? 'moon' : 'sunny'} color={colors.text} size={24} />
      <Text style={{ color: colors.text, lineHeight: 24 }}>{`${theme} mode`}</Text>
    </TouchableOpacity>
  );
}
