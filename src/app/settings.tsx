import { Pressable, View, Text } from "react-native";
import { useAuth } from "@/context/AuthContext";

export default function Settings() {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <View>
            <Pressable onPress={handleLogout}>
                <Text>ÇIKIŞ YAP</Text>
            </Pressable>
        </View>
    );
}