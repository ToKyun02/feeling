import LogoText from '@/components/ui/logos/LogoText';
import { Ionicons } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { useTheme } from './ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import { useRouter } from 'expo-router';

const tabList = [
  { href: '/', label: '홈', iconName: 'home-outline' },
  { href: '/', label: '일기장', iconName: 'book-outline' },
  { href: '/', label: '감정 분석', iconName: 'bar-chart-outline' },
  { href: '/', label: '타임 캡슐', iconName: 'stopwatch-outline' },
  { href: '/', label: '월간 회고', iconName: 'calendar-number-outline' },
] as const;

const styles = StyleSheet.create({
  horizonalAlign: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  tabItem: {
    width: '100%',
    paddingVertical: 8,
  },
  tabText: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    paddingLeft: 8,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProps | null>(null);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(slideAnim, { toValue: isOpen ? 0 : -300, duration: 300, useNativeDriver: true }),
      Animated.timing(overlayAnim, { toValue: isOpen ? 1 : 0, duration: 300, useNativeDriver: true }),
    ]);
    animation.start();
  }, [isOpen]);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}

      {isOpen && (
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <Animated.View
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              opacity: overlayAnim,
            }}
          />
        </TouchableWithoutFeedback>
      )}

      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          backgroundColor: theme.colors.paper,
          transform: [{ translateX: slideAnim }],
          borderRadius: 12,
        }}
      >
        <View style={[styles.horizonalAlign, { justifyContent: 'space-between', paddingVertical: 12 }]}>
          <LogoText fontSize={16} />
          <Octicons name='x' size={24} color={theme.colors.textSecondary} onPress={() => setIsOpen(false)} />
        </View>

        <View style={[styles.profileContainer, { borderBottomColor: theme.colors.textSecondary }]}>
          <TouchableOpacity style={[styles.profileImage, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name='person' size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={{ fontFamily: 'NotoSansKR_700Bold', color: theme.colors.text }}>사용자</Text>
            <Text style={{ fontFamily: 'NotoSansKR_400Regular', color: theme.colors.textSecondary }}>
              test@email.com
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            width: '100%',
            gap: 4,
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.textSecondary,
            paddingVertical: 8,
          }}
        >
          <TabList setIsOpen={setIsOpen} />
        </View>

        <ThemeToggle />
      </Animated.View>
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar()는 SidebarProvider 안에서 사용해주세요.');
  }
  return context;
};

function TabList({ setIsOpen }: { setIsOpen: SidebarContextProps['setIsOpen'] }) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      {tabList.map((tabItem) => (
        <TouchableHighlight
          key={tabItem.label}
          style={styles.tabItem}
          onPress={() => {
            setIsOpen(false);
            router.navigate(tabItem.href);
          }}
          underlayColor={theme.theme === 'dark' ? '#0f0f0f' : '#dddddd'}
        >
          <View style={[styles.horizonalAlign, { gap: 8 }]}>
            <Ionicons size={24} name={tabItem.iconName} color={theme.colors.text} />
            <Text style={[styles.tabText, { color: theme.colors.text, lineHeight: 24 }]}>{tabItem.label}</Text>
          </View>
        </TouchableHighlight>
      ))}
    </>
  );
}
