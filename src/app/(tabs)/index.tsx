import { StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/Header';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.safeArea} >
        <Header title="Ana Sayfa" showNotifications showAddButton />

      </View>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
