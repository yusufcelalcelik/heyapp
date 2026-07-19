import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';

const PROFILE = {
    username: 'yusufcelalcelik',
    fullName: 'Yusuf Celal Çelik',
    bio: 'React Native öğreniyorum 🚀',
    avatar: 'https://picsum.photos/200',
    postsCount: 12,
    followers: 340,
    following: 180,
};

const PHOTOS = Array.from({ length: 12 }, (_, i) => ({
    id: String(i),
    uri: `https://picsum.photos/300?random=${i}`,
}));

export default function ProfileScreen() {
    const theme = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            {/* buraya devam edeceğiz */}
            {/* buraya header bileşeni eklenecek */}
            <Header title={PROFILE.username} showSettings />

            {/* Burası  poprfil header */}

            <View style={styles.profileHeader}>
                {/* Porfil İconu */}

                <View>
                    <Image
                        source={{ uri: PROFILE.avatar }}
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                    />

                </View>
                {/* Burası  takipçi sayısı fln ç*/}
                <View style={styles.statsColumn}>
                    <Text style={styles.fullName}>{PROFILE.fullName}</Text>

                    <View style={styles.statsRow}>
                        {/* Post sayısı */}

                        <View style={styles.statItem}>
                            <Text>Post</Text>
                            <Text>{PROFILE.postsCount}</Text>
                        </View>
                        {/* Takipçi sayısı */}

                        <View style={styles.statItem}>

                            <Text>Takipçi</Text>

                            <Text> {PROFILE.followers}</Text>
                        </View>
                        {/* Takip ettikleri sayısı */}
                        <View style={styles.statItem}>

                            <Text>Takip</Text>

                            <Text>  {PROFILE.following}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Biografi*/}
            <View style={styles.bioContainer}>
                <Text>{PROFILE.bio}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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


