// Native (iOS/Android) için react-native'in kendi useColorScheme'i yeterli.
// Web tarafında farklı davranması gerektiğinden bu dosyanın use-color-scheme.web.ts karşılığı var;
// Metro bundler platforma göre otomatik olarak doğru dosyayı seçiyor.
export { useColorScheme } from 'react-native';
