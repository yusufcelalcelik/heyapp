import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Spacing } from '@/constants/theme';
import { router } from 'expo-router';

type HeaderProps = {
    title?: string;
    showBack?: boolean;
    showNotifications?: boolean;
    showSettings?: boolean;
    showAddButton?: boolean;
};
export function Header({ title, showBack = false, showNotifications = false, showSettings = false, showAddButton = false }: HeaderProps) {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            {showBack && (
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color={theme.text} />
                </Pressable>
            )}

            <View style={styles.side}>
                {showAddButton && (
                    <Pressable>
                        <Ionicons name="add-circle-outline" size={24} color={theme.text} />
                    </Pressable>
                )}
            </View>

            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>

            <View style={styles.side}>
                {showNotifications && (
                    <Pressable>
                        <Ionicons name="notifications-outline" size={24} color={theme.text} />
                    </Pressable>
                )}
                {showSettings && (
                    <Pressable onPress={() => router.replace("/settings")}>
                        <Ionicons name="settings-outline" size={24} color={theme.text} />
                    </Pressable>

                )}
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.four,
        paddingVertical: Spacing.three,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    side: {
        flexDirection: 'row',
        gap: Spacing.three,
        minWidth: 24,
    },
});
