import { login } from '@/api/api';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

/**
 * Giriş ekranı. Kullanıcı adı/şifre alıp login API'sini çağırır,
 * başarılı olursa dönen kullanıcı bilgilerini AuthContext'e kaydeder.
 */
export default function Login() {
    // theme burada TextInput/Ionicons/LinearGradient gibi ThemedView/ThemedText kapsamayan
    // bileşenlerin rengini manuel ayarlamak için hâlâ gerekli.
    const theme = useTheme();
    const { setIsLogged, setUser } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (username == '' || password == '') return Alert.alert("Uyarı", "Alanları doldurmadınız")
        try {
            const response = await login(username, password)
            // API'nin döndürdüğü alan adları (özellikle "followers") UserData tipindeki
            // alan adlarıyla (follower) birebir aynı olmayabiliyor, bu yüzden burada manuel eşliyoruz.
            setUser({
                uuid: response.uuid,
                name: response.name,
                username,
                post: response.post,
                follow: response.follow,
                follower: response.followers,
                bio: response.bio
            })

            setIsLogged(true);
            // isLogged true olduğunda _layout.tsx'teki guard zaten (app) grubuna geçiriyor;
            // bu replace ek bir güvence, geriye login'e dönülmesini de engelliyor.
            router.replace('/')

        } catch (error) {
            console.log("HATA:", error)
            Alert.alert("Hata", "Giriş başarısız, kullanıcı adı veya şifre hatalı")
        }

    }
    return (
        <ThemedView style={styles.safeArea}>
            <View style={styles.card}>

                <View style={styles.header}>
                    <ThemedText style={styles.title}>Hoşgeldiniz</ThemedText>
                    <ThemedText style={styles.subtitle} themeColor="textSecondary">Hesabınıza Giriş Yapın</ThemedText>
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
                        style={({ pressed, hovered }) => [
                            styles.loginButton,
                            (pressed || hovered) && { opacity: 0.85 },
                        ]}
                        onPress={() => handleLogin()}>
                        <LinearGradient
                            colors={[theme.primary, theme.secondary]}
                            style={styles.loginButtonGradient}>
                            {/* Burada ThemedText değil düz Text kullanılıyor: yazı her zaman beyaz kalmalı,
                                çünkü arka plan tema rengine göre değil sabit gradient'e göre kontrast sağlıyor. */}
                            <Text style={styles.loginButtonText}>Giriş Yap</Text>
                        </LinearGradient>
                    </Pressable>

                </View>
            </View>
        </ThemedView>
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
    title: {
        fontSize: 28,
        fontWeight: '700',
    },
    subtitle: {
        fontSize: 15,
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
