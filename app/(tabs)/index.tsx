import { useTheme } from '@/providers/ThemeProvider';
import { ScrollView, Text } from 'react-native';

export default function Index() {
  const theme = useTheme();

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Home Screen</Text>
    </ScrollView>
  );
}
