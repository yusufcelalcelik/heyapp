import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Web'de static rendering desteklemek için renk şemasının client tarafında yeniden hesaplanması gerekiyor.
 * Sunucu tarafında (SSR/static export) her zaman 'light' döner; tarayıcıda hydration bitince
 * (hasHydrated true olunca) gerçek sistem temasına geçilir. Bu sayede sunucu ve client'ın
 * ilk render çıktısı eşleşir, hydration mismatch hatası oluşmaz.
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
