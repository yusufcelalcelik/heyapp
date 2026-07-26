import { Href, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

/**
 * Dış (uygulama dışı) linkleri açan bileşen.
 * Web'de normal bir <a target="_blank"> gibi davranır.
 * Native'de (iOS/Android) ise kullanıcıyı uygulamadan çıkarıp cihazın tarayıcısına atmak yerine,
 * uygulama içinde açılan bir tarayıcı (in-app browser) kullanılır — kullanıcı deneyimi bozulmasın diye.
 */
export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          // Native'de varsayılan davranışı (harici tarayıcıya yönlendirmeyi) engelle.
          event.preventDefault();
          // Bunun yerine linki uygulama içi tarayıcıda aç.
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}
