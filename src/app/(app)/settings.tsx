import { Pressable, Alert, StyleSheet } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from '@expo/vector-icons';
import { Spacing } from '@/constants/theme';

/**
 * Ayarlar sayfası. Şimdilik sadece çıkış yap butonunu içeriyor.
 */
export default function Settings() {
    const { logout } = useAuth();

    // Kazara basılıp oturumun kapanmaması için önce onay isteniyor (destructive stil = kırmızı "Çıkış" butonu).
    const handleLogout = () => {
        Alert.alert(
        "Çıkış Yap",
        "Çıkmak istediğinizden emin misiniz?",
        [
            {
                text: "İptal",
                onPress: () => {},
                style: "cancel"
            },
            {
                text: "Çıkış",
                onPress: () => logout(),
                style: "destructive"
            }
        ]
    );
    };

    return (
        <ThemedView style={styles.container}>
            <Header showBack={true} title={"Ayarlar"}/>
            <Pressable
                style={({ pressed }) => [styles.logoutButton, pressed && styles.logoutButtonPressed]}
                onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
                <ThemedText style={styles.logoutText}>Çıkış Yap</ThemedText>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // Kırmızı renk (#FF3B30) tema rengine göre değil sabit tutuluyor:
    // "tehlikeli/geri dönüşü olmayan aksiyon" anlamı açık/koyu temada da aynı kalmalı.
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.two,
        marginHorizontal: Spacing.four,
        marginTop: Spacing.four,
        paddingVertical: Spacing.three,
        paddingHorizontal: Spacing.three,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 59, 48, 0.1)',
    },
    logoutButtonPressed: {
        opacity: 0.7,
    },
    logoutText: {
        color: '#FF3B30',
        fontWeight: '600',
        fontSize: 16,
    },
});
