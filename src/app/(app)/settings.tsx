import { Pressable, View, Text,Alert } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { useTheme } from '@/hooks/use-theme';

export default function Settings() {
    const { logout } = useAuth();
    const theme = useTheme();

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
        <View>
            <Header showBack={true} />
            <Pressable onPress={handleLogout}>
                <Text>ÇIKIŞ YAP</Text>
            </Pressable>
        </View>
    );
}