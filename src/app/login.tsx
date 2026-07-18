import { login } from '@/api/api';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
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
    const { setIsLogged } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (username == '' || password == '') return Alert.alert("Uyarı", "Alanları doldurmadınız")
        try {
            //Buraya login api  fonksiyonu gelecek
            const response = await login(username, password)
            // console.log(response)
            setIsLogged(true);
            router.replace('/')
        } catch (error) {
            console.log("HATA:", error)
            Alert.alert("Hata", "Giriş başarısız, kullanıcı adı veya şifre hatalı")
        }

    }
    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
            {/* Login Card */}

            <View style={styles.card}>

                <View style={styles.header}>
                    <Text style={{ color: theme.text }}>Hoşgeldiniz</Text>
                    <Text style={{ color: theme.textSecondary }}>Hesabınıza Giriş Yapın</Text>
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundElement }]}
                        placeholder="Kullanıcı Adı"
                        onChangeText={setUsername}
                        autoCapitalize='none'
                    >
                    </TextInput>
                    <View style={styles.passwordWrapper}>
                        <TextInput
                            style={[styles.input, styles.passwordInput, { color: theme.text, backgroundColor: theme.backgroundElement }]}
                            placeholder="Şifre"
                            secureTextEntry={!showPassword}
                            onChangeText={setPassword}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                        <Pressable style={styles.showPasswordButton} onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color={theme.text} />
                        </Pressable>
                    </View>
                    <Pressable
                        style={styles.loginButton}
                        onPress={() => handleLogin()}>
                        <LinearGradient
                            colors={[theme.primary, theme.secondary]}
                            style={styles.loginButtonGradient}>
                            <Text style={styles.loginButtonText}>Giriş Yap</Text>
                        </LinearGradient>
                    </Pressable>

                </View>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        paddingHorizontal: Spacing.four,
        gap: Spacing.four,
    },
    header: {
        gap: Spacing.one,
    },
    form: {
        gap: Spacing.three,
    },
    input: {
        padding: Spacing.three,
        borderRadius: 10,
    },
    passwordWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    showPasswordButton: {
        position: 'absolute',
        right: Spacing.three,
    },
    passwordInput: {
        paddingRight: 44, // ikon + boşluk için yer aç
    },
    loginButton: {
        width: '100%',
    },
    loginButtonGradient: {
        padding: Spacing.three,
        alignItems: 'center',
        borderRadius: 12,
    },
    loginButtonText: {
        color: 'white',
        fontWeight: '600',
    },
});
