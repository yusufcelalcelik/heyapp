import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // TODO(öğrenme - kontrol/state): "Kullanıcı giriş yaptı mı?" bilgisini burada bir
  // state olarak tutacağız. Şimdilik gerçek bir auth sistemi yok, o yüzden basitçe:
  //   import { useState } from 'react';
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useState React'te "hafıza" gibi düşünülebilir: bir değeri tutar ve değiştiğinde
  // component'i otomatik yeniden render eder. Burada false ise "login" ekranını,
  // true ise "(tabs)" ekranını göstereceğiz. setIsLoggedIn'i login.tsx dosyasından
  // login butonuna basıldığında çağıracağız (o yüzden bunu bir Context/ctx.ts
  // dosyasına taşımak gerekecek ki hem burada hem login.tsx'te erişilebilsin -
  // şimdilik sadece mantığı öğrenmek için useState yeterli).
  const [isLogged, setIsLogged] = useState(false);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      {/* TODO(öğrenme - Stack.Protected): Aşağıdaki iki Stack.Screen'i, guard prop'u
          alan Stack.Protected bloklarıyla sarmalayacağız:
          
            <Stack.Protected guard={isLoggedIn}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="settings" />
            </Stack.Protected>
            <Stack.Protected guard={!isLoggedIn}>
              <Stack.Screen name="login" />
            </Stack.Protected>
          guard={false} olan taraf Router için hiç yokmuş gibi davranır, bu yüzden
          kullanıcı otomatik olarak guard={true} olan tarafa yönlenir. isLoggedIn
          false olduğu sürece Router'ın gördüğü TEK ekran "login" olacağı için
          uygulama açılışta direkt login'e düşer. */}
      <Stack.Protected guard={isLogged}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="settings" />
      </Stack.Protected>
      <Stack.Protected guard={!isLogged}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </ThemeProvider>
  );
}
