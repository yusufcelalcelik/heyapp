import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';

// TODO(öğrenme - tema): Text/View yerine projede hazır olan ThemedText/ThemedView'i
// kullanın, dark/light rengi otomatik gelir:
//   import { ThemedText } from '@/components/themed-text';
//   import { ThemedView } from '@/components/themed-view';
// Sonra <View> -> <ThemedView>, <Text> -> <ThemedText> yapın (aynı şekilde
// kullanılıyor, ekstra prop zorunlu değil). Renkleri değiştirmek isterseniz
// src/constants/theme.ts içindeki Colors.light / Colors.dark objesine bakın -
// tüm uygulamanın renk kaynağı orası.
export default function Login() {
    const theme = useTheme();
    return (
        <ThemedView>
            <ThemedText style={{ color: theme.text }}>Login</ThemedText>
        </ThemedView>
    )
}