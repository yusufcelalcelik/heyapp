import { Stack } from 'expo-router';

/**
 * (app) grubunun kendi navigator'ı. Guard mantığı içermiyor, sadece grup içindeki
 * ekranlar (tabs, settings) arasında geçişi sağlıyor. Kimin bu gruba girebileceğine
 * kök _layout.tsx'teki Stack.Protected guard'ı karar veriyor.
 */
export default function AppLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
