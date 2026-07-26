import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Header } from '@/components/Header';
import { useAuth } from '@/context/AuthContext';

const PROFILE = {
    avatar: 'https://picsum.photos/200',
};

const PHOTOS = Array.from({ length: 12 }, (_, i) => ({
    id: String(i),
    uri: `https://picsum.photos/300?random=${i}`,
}));

export default function ProfileScreen() {
    const theme = useTheme();
    const { user } = useAuth()
    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            {/* buraya devam edeceğiz */}
            {/* buraya header bileşeni eklenecek */}
            <Header title={user?.username} showSettings />

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
                    <Text style={styles.fullName}>{user?.name}</Text>

                    <View style={styles.statsRow}>
                        {/* Post sayısı */}

                        <View style={styles.statItem}>
                            <Text>Post</Text>
                            <Text>{user?.post}</Text>
                        </View>
                        {/* Takipçi sayısı */}

                        <View style={styles.statItem}>

                            <Text>Takipçi</Text>

                            <Text> {user?.follower}</Text>
                        </View>
                        {/* Takip ettikleri sayısı */}
                        <View style={styles.statItem}>

                            <Text>Takip</Text>

                            <Text>  {user?.follow}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Biografi*/}
            <View style={styles.bioContainer}>
                <Text>{user?.bio}</Text>
            </View>
        </View>
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


