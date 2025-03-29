import { useTheme } from '@/providers/ThemeProvider';
import { Text, ScrollView } from 'react-native';

export default function Profile() {
  const theme = useTheme();
  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Profile Screen</Text>
    </ScrollView>
  );
}
