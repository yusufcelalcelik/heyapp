import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/Header';

/**
 * Ana sayfa (Home tab). Şimdilik sadece Header gösteriyor, içerik daha sonra eklenecek.
 */
export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Header title="Ana Sayfa" showNotifications showAddButton />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
