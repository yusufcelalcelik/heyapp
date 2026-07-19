import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PROFILE = {
    username: 'yusufcelal',
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


            {/* Burası  poprfil header */}

            <View>
                {/* Porfil İconu */}

                <View>
                    <Image
                        source={{ uri: PROFILE.avatar }}
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                    />

                </View>
                {/* Burası  takipçi sayısı fln ç*/}
                <View>
                    {/* Post sayısı */}

                    <View>
                        <Text>Post</Text>
                        <Text>{PROFILE.postsCount}</Text>
                    </View>
                    {/* Takipçi sayısı */}

                    <View>
                        <Text>Takipçi</Text>

                        <Text> {PROFILE.followers}</Text>
                    </View>
                    {/* Takip ettikleri sayısı */}

                    <View>
                        <Text>Takip</Text>

                        <Text>  {PROFILE.following}</Text>
                    </View>
                </View>

                {/* Biografi*/}
                <View>
                    <Text> {PROFILE.bio}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

