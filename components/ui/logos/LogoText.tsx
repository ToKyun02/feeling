import { useTheme } from '@/providers/ThemeProvider';
import { View, Text } from 'react-native';

import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

export default function LogoText({ fontSize }: { fontSize: number }) {
  const theme = useTheme();

  return (
    <View>
      <MaskedView
        maskElement={
          <Text style={{ fontSize, fontWeight: '700', textAlign: 'center', fontFamily: 'NotoSansKR_700Bold' }}>
            마음 일기
          </Text>
        }
      >
        <LinearGradient
          colors={[theme.colors.secondary, theme.colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: fontSize * 4, height: fontSize * 1.5 }}
        />
      </MaskedView>
    </View>
  );
}
