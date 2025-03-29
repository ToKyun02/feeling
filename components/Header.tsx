import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProvider';
import LogoText from './ui/logos/LogoText';
import { Link } from 'expo-router';
import { useSidebar } from '@/providers/SidebarProvider';

export default function Header() {
  const theme = useTheme();
  const { setIsOpen } = useSidebar();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: `${theme.colors.background}`,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: `${theme.colors.text}`,
      }}
    >
      <TouchableOpacity style={{ width: 32 }}>
        <Ionicons name='menu' size={20} color={theme.colors.text} onPress={() => setIsOpen(true)} />
      </TouchableOpacity>

      <Link href='/'>
        <LogoText fontSize={28} />
      </Link>

      <TouchableOpacity
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: `${theme.colors.primary}`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name='person' size={20} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  );
}
