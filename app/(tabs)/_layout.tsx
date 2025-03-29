import Header from '@/components/Header';
import { useTheme } from '@/providers/ThemeProvider';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        header: () => <Header />,
        tabBarStyle: {
          backgroundColor: theme.colors.paper,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
