import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ThemeModeProvider } from '@/context/ThemeContext';
import { useTheme } from '@/hooks/use-theme';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { ReactNode } from 'react';
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
      <ThemeModeProvider>
        <SafeAreaProvider>
          <ThemedSafeArea>
            <RootNavigator />
          </ThemedSafeArea>
        </SafeAreaProvider>
      </ThemeModeProvider>
    </AuthProvider>
  );
}

/**
 * SafeAreaView'ın kendisi (çentik/durum çubuğu ve home indicator alanları dahil) aktif temanın
 * arka plan rengini kullansın diye eklendi. useTheme, ThemeModeProvider'ın altında çağrılmak
 * zorunda olduğu için bu mantık RootLayout'tan ayrı bir component'e alındı.
 */
function ThemedSafeArea({ children }: { children: ReactNode }) {
  const theme = useTheme();

  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>{children}</SafeAreaView>;
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
