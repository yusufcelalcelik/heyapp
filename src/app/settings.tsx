import { Pressable, View, Text } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { useTheme } from '@/hooks/use-theme';

export default function Settings() {
    const { logout } = useAuth();
    const theme = useTheme();

    const handleLogout = () => {
        logout();
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