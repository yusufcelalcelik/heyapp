import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

type HeaderProps = {
    title?: string;
    showBack?: boolean;
    showNotifications?: boolean;
    showSettings?: boolean;
    showAddButton?: boolean;
};

/**
 * Sayfa üstünde kullanılan ortak başlık bileşeni.
 * Hangi ikonların görüneceği (geri, bildirim, ayarlar, ekle) prop'larla kontrol edilir.
 *
 * Ortalanma mantığı: sol ikon grubu, title ve sağ ikon grubu eşit `flex: 1` alıyor.
 * Böylece herhangi bir tarafta ikon olsun ya da olmasın, title her zaman tam ortada kalıyor.
 */
export function Header({ title, showBack = false, showNotifications = false, showSettings = false, showAddButton = false }: HeaderProps) {
    const theme = useTheme();

    return (
        <ThemedView style={styles.container}>
            <View style={styles.side}>
                {showBack && (
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color={theme.text} />
                    </Pressable>
                )}
                {showAddButton && (
                    <Pressable>
                        <Ionicons name="add-circle-outline" size={24} color={theme.text} />
                    </Pressable>
                )}
            </View>

            {/* Uzun başlıklar (örn. kullanıcı adı) tek satırda kalıp gerekirse "..." ile kesilsin diye numberOfLines kullanılıyor. */}
            <ThemedText style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</ThemedText>

            <View style={[styles.side, styles.sideRight]}>
                {showNotifications && (
                    <Pressable>
                        <Ionicons name="notifications-outline" size={24} color={theme.text} />
                    </Pressable>
                )}
                {showSettings && (
                    // push kullanılıyor: replace olsaydı geçmiş ekran silinir, settings'teki geri butonu çalışmazdı.
                    <Pressable onPress={() => router.push("/settings")}>
                        <Ionicons name="settings-outline" size={24} color={theme.text} />
                    </Pressable>
                )}
            </View>
        </ThemedView>
    );

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.four,
        paddingVertical: Spacing.three,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
    },
    side: {
        flex: 1,
        flexDirection: 'row',
        gap: Spacing.three,
        minWidth: 24,
    },
    sideRight: {
        justifyContent: 'flex-end',
    },
});
