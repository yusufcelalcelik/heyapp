import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const colorScheme = useColorScheme();
  const { isLogged } = useAuth();   // artık AuthProvider'ın İÇİNDE, sorun yok

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <AnimatedSplashOverlay />
      <Stack.Protected guard={isLogged}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="settings" />
      </Stack.Protected>
      <Stack.Protected guard={!isLogged}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  );
}
