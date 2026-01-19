import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <AlertCircle size={80} color={Colors.text.tertiary} strokeWidth={1.5} />
        <Text style={styles.title}>Page not found</Text>
        <Text style={styles.subtitle}>The page you&apos;re looking for doesn&apos;t exist.</Text>

        <Link href="/home" style={styles.link}>
          <Text style={styles.linkText}>Go to Home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginTop: 24,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginTop: 8,
    textAlign: 'center' as const,
  },
  link: {
    marginTop: 32,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.inverse,
  },
});
