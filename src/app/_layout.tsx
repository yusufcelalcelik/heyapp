import { Stack } from 'expo-router';
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
