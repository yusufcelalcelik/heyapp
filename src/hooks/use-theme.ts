import { Colors } from '@/constants/theme';
import { useThemeMode } from '@/context/ThemeContext';

/**
 * Kullanıcının ThemeContext'te seçtiği moda (light/dark/system) göre doğru renk paletini
 * (Colors.light / Colors.dark) döndürür. Bileşenlerde theme.text, theme.background gibi
 * alanlara erişmek için kullanılır.
 */
export function useTheme() {
  const { resolvedTheme } = useThemeMode();

  return Colors[resolvedTheme];
}
