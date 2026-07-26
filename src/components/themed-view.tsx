import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

/**
 * Arka plan rengini aktif temaya (açık/koyu) göre otomatik ayarlayan View.
 * `type` prop'u ile constants/theme.ts'teki renklerden biri seçilebilir
 * (örn. type="backgroundElement"); belirtilmezse "background" kullanılır.
 * Amaç: her component'te theme.background gibi manuel style yazmaktan kurtulmak.
 */
export function ThemedView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();

  return <View style={[{ backgroundColor: theme[type ?? 'background'] }, style]} {...otherProps} />;
}
