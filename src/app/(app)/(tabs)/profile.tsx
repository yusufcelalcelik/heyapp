import { Spacing } from '@/constants/theme';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { Header } from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

// Avatar için gerçek kullanıcı verisi yok, şimdilik sabit bir placeholder görsel kullanılıyor.
const PROFILE = {
    avatar: 'https://picsum.photos/200',
};

// TODO: Profilde fotoğraf grid'i (FlatList) eklenince bu placeholder veriler kullanılacak.
const PHOTOS = Array.from({ length: 12 }, (_, i) => ({
    id: String(i),
    uri: `https://picsum.photos/300?random=${i}`,
}));

/**
 * Giriş yapan kullanıcının profil bilgilerini (isim, post/takipçi/takip sayıları, bio) gösterir.
 * Veriler AuthContext'teki user objesinden geliyor; user null olabileceği için her yerde ?. kullanılıyor.
 */
export default function ProfileScreen() {
    const { user } = useAuth()
    return (
        <ThemedView style={styles.container}>
            <Header title={user?.username} showSettings />

            <View style={styles.profileHeader}>
                <View>
                    <Image
                        source={{ uri: PROFILE.avatar }}
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                    />
                </View>
                <View style={styles.statsColumn}>
                    <ThemedText style={styles.fullName}>{user?.name}</ThemedText>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <ThemedText>Post</ThemedText>
                            <ThemedText>{user?.post}</ThemedText>
                        </View>
                        <View style={styles.statItem}>
                            <ThemedText>Takipçi</ThemedText>
                            <ThemedText> {user?.follower}</ThemedText>
                        </View>
                        <View style={styles.statItem}>
                            <ThemedText>Takip</ThemedText>
                            <ThemedText>  {user?.follow}</ThemedText>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.bioContainer}>
                <ThemedText>{user?.bio}</ThemedText>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.four,
        paddingHorizontal: Spacing.four,
    },
    fullName: {
        fontWeight: '700',
        marginBottom: 10,
    },
    statsColumn: {
        flex: 1,   // eskiden statsRow'daki flex:1'i buraya taşı
        gap: Spacing.one,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // flex: 1 artık burada değil, statsColumn'a taşındı
    },

    statItem: {
        alignItems: 'center',
    },
    bioContainer: {
        paddingHorizontal: Spacing.four,
        marginTop: Spacing.three,
        gap: Spacing.half,
    },

});


