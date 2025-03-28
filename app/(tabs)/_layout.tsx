import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0f7f80',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#25292e',
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
