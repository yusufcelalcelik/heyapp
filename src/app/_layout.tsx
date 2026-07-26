import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// Splash screen'in otomatik kapanmasını engelliyoruz; AnimatedSplashOverlay layout hazır olunca
// SplashScreen.hideAsync()'i kendi zamanlamasıyla çağırıp yumuşak bir geçiş animasyonu gösteriyor.
SplashScreen.preventAutoHideAsync();

/**
 * Uygulamanın en dış katmanı. Context provider'lar (Auth) ve güvenli alan (SafeArea) sarmalayıcıları burada.
 * RootNavigator, AuthProvider'ın İÇİNDE tanımlı çünkü useAuth() hook'u Provider'ın altında çalışmak zorunda.
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <RootNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

/**
 * Giriş durumuna göre hangi ekran grubunun gösterileceğine karar veren asıl navigasyon mantığı.
 * Stack.Protected + guard sayesinde isLogged false/true değiştiğinde ekranlar arasında
 * manuel router.replace çağırmaya gerek kalmadan otomatik geçiş sağlanıyor.
 */
function RootNavigator() {
  const colorScheme = useColorScheme();
  const { isLogged } = useAuth();

  return (
    <>
      {/* (app) grubundaki tüm alt sayfalar (tabs, settings...) burada tek satırla korunur.
          Yeni "sadece giriş yapmış kullanıcı görsün" sayfası eklerken (app) klasörünün altına koymak yeterli. */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isLogged}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
        <Stack.Protected guard={!isLogged}>
          <Stack.Screen name="login" />
        </Stack.Protected>
      </Stack>
      <AnimatedSplashOverlay />
    </>
  );
}
