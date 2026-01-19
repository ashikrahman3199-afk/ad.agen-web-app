import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ColorValue,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import { CheckCircle2, Home, FileText } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';

export default function BookingSuccessScreen() {
  const insets = useSafeAreaInsets();
  const scaleAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const orderId = `ORD-${Date.now().toString().slice(-6)}`;

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.safeBackground} />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={Colors.gradient.success as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]]}
            style={styles.iconGradient}
          >
            <CheckCircle2 size={80} color={Colors.text.inverse} strokeWidth={2} />
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Booking Successful!</Text>
          <Text style={styles.subtitle}>
            Your campaign has been booked successfully
          </Text>

          <View style={styles.orderCard}>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Order ID</Text>
              <Text style={styles.orderValue}>{orderId}</Text>
            </View>
            <View style={styles.orderDivider} />
            <Text style={styles.orderNote}>
              We are currently working on your campaign. You will receive a confirmation email shortly with all the details.
            </Text>
          </View>

          <View style={styles.infoCard}>
            <FileText size={24} color={Colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>What happens next?</Text>
              <Text style={styles.infoText}>
                • Our team will review your campaign details{'\n'}
                • You will receive a confirmation email{'\n'}
                • Campaign will go live on the scheduled date{'\n'}
                • Track performance in your dashboard
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.replace('/(tabs)/home')}
        >
          <LinearGradient
            colors={Colors.gradient.primary as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]]}
            style={styles.buttonGradient}
          >
            <Home size={20} color={Colors.text.inverse} />
            <Text style={styles.primaryButtonText}>Go to Home</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/(tabs)/dashboard')}
        >
          <Text style={styles.secondaryButtonText}>View Dashboard</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeBackground: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconGradient: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 12,
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center' as const,
    marginBottom: 32,
    lineHeight: 24,
  },
  orderCard: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...Colors.shadow.medium,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '600' as const,
  },
  orderValue: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  orderDivider: {
    height: 1,
    backgroundColor: Colors.border.light,
    marginBottom: 16,
  },
  orderNote: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  infoCard: {
    width: '100%',
    backgroundColor: Colors.primary + '10',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    gap: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    gap: 12,
  },
  primaryButton: {
    borderRadius: 12,
    overflow: 'hidden',
    ...Colors.shadow.medium,
  },
  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
  secondaryButton: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
});
