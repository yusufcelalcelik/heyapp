import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Cihazın açık/koyu mod ayarına göre doğru renk paletini (Colors.light / Colors.dark) döndürür.
 * Bileşenlerde theme.text, theme.background gibi alanlara erişmek için kullanılır.
 * Detay: https://docs.expo.dev/guides/color-schemes/
 */
export function useTheme() {
  const scheme = useColorScheme();
  // useColorScheme bazı platformlarda 'unspecified' dönebilir, bu durumda light'a düşüyoruz.
  const theme = scheme === 'unspecified' ? 'light' : scheme;

  return Colors[theme];
}
