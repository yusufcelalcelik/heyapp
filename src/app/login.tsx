import { useTheme } from '@/hooks/use-theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    console.log('theme', theme);
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
            {/* Login Card */}

            <View >
                <View>
                    <Text style={{ color: theme.text }}>Hoşgeldiniz</Text>
                    <Text style={{ color: theme.textSecondary }}>Hesabınıza Giriş Yapın</Text>
                </View>
                <View>
                    <TextInput
                        style={{ color: theme.text }}
                        placeholder="Kullanıcı Adı">
                    </TextInput>
                    <TextInput
                        style={{ color: theme.text }}
                        placeholder="Şifre"
                        secureTextEntry={true}>
                    </TextInput>
                    <Pressable>
                        <LinearGradient
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={{ padding: 10, alignItems: 'center', borderRadius: 5 }}>
                            <Text style={{ color: 'white' }}>Giriş Yap</Text>
                        </LinearGradient>
                    </Pressable>

                </View>
            </View>
        </SafeAreaView>
    )

}