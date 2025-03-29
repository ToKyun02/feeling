import QueryClientProvider from '@/providers/QueryProvider';
import { SidebarProvider } from '@/providers/SidebarProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <SidebarProvider>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          </Stack>
          <Toast />
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
