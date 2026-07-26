import { Pressable, Alert } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export default function Settings() {
    const { logout } = useAuth();

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
        <ThemedView style={{ flex: 1 }}>
            <Header showBack={true} title={"Ayarlar"}/>
            <Pressable onPress={handleLogout}>
                <ThemedText>ÇIKIŞ YAP</ThemedText>
            </Pressable>
        </ThemedView>
    );
}