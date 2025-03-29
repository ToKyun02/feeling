import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'app-theme';

type Theme = 'light' | 'dark';

const themeColors = {
  light: {
    primary: '#9c27b0',
    secondary: '#e91e63',
    error: '#FF5757',
    warning: '#FF9843',
    info: '#57C7FF',
    success: '#4CAF50',
    background: '#f8f9fa',
    text: '#212121',
    textSecondary: '#757575',
    paper: '#ffffff',
    divider: 'rgba(0,0,0,0.12)',
    // 감정 색상
    happy: '#FF9843',
    anxious: '#FF5757',
    peaceful: '#57C7FF',
    thoughtful: '#A157FF',
    melancholy: '#6B7280',
  },
  dark: {
    primary: '#bb86fc',
    secondary: '#cf6679',
    error: '#FF7A7A',
    warning: '#FFB067',
    info: '#7AD3FF',
    success: '#81c784',
    background: '#121212',
    text: '#e0e0e0',
    textSecondary: '#a0a0a0',
    paper: '#1e1e1e',
    divider: 'rgba(255,255,255,0.12)',
    // 감정 색상
    happy: '#FFB067',
    anxious: '#FF7A7A',
    peaceful: '#7AD3FF',
    thoughtful: '#B57AFF',
    melancholy: '#9CA3AF',
  },
};

interface ThemeContextProps {
  theme: Theme;
  colors: {
    primary: string;
    secondary: string;
    error: string;
    warning: string;
    info: string;
    success: string;
    background: string;
    text: string;
    textSecondary: string;
    paper: string;
    divider: string;
    happy: string;
    anxious: string;
    peaceful: string;
    thoughtful: string;
    melancholy: string;
  };
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme) {
        setTheme(storedTheme as Theme);
      } else {
        const systemTheme = Appearance.getColorScheme();
        setTheme(systemTheme === 'dark' ? 'dark' : 'light');
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, colors: themeColors[theme], toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme()은 ThemeProvider 안에서 사용해주세요.');
  }
  return context;
};
