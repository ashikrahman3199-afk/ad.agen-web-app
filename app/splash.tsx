import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ColorValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TrendingUp } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login' as any);
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient
      colors={Colors.gradient.primary as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]]}
      style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <TrendingUp size={80} color={Colors.text.inverse} strokeWidth={2} />
        </View>
        <Text style={styles.title}>Ad-Run</Text>
        <Text style={styles.tagline}>Your Perfect Ad Space Partner</Text>
      </View>
      <Text style={styles.footer}>Powered by Innovation</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 48,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: Colors.text.inverse,
    opacity: 0.9,
  },
  footer: {
    fontSize: 12,
    color: Colors.text.inverse,
    opacity: 0.7,
  },
});
