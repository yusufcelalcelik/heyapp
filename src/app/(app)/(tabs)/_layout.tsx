
import * as SplashScreen from 'expo-splash-screen';


import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

SplashScreen.preventAutoHideAsync();

/**
 * Tab ekranlarının (index, profile) sarmalayıcısı.
 * Gerçek sekme çubuğu AppTabs bileşeninde (platforma göre app-tabs.tsx / app-tabs.web.tsx).
 */
export default function TabLayout() {

    return (
        <>
            <AnimatedSplashOverlay />
            <AppTabs />
        </>
    );
}
