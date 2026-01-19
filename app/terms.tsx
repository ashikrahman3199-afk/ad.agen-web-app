import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

export default function TermsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Terms of Service',
          headerShown: true,
        }} 
      />
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.lastUpdated}>Last updated: January 20, 2025</Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms{'\n'}</Text>
          <Text style={styles.text}>
            By accessing and using this advertising platform, you accept and agree to be bound by the terms and provision of this agreement.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>2. Use License{'\n'}</Text>
          <Text style={styles.text}>
            Permission is granted to temporarily download one copy of the materials on the platform for personal, non-commercial transitory viewing only.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>3. Booking and Payment{'\n'}</Text>
          <Text style={styles.text}>
            All bookings are subject to availability and confirmation. Payment must be completed at the time of booking. Prices are subject to change without notice.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>4. Cancellation Policy{'\n'}</Text>
          <Text style={styles.text}>
            Cancellations made 48 hours or more before the start date will receive a full refund minus processing fees. Cancellations within 48 hours are non-refundable.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>5. Content Guidelines{'\n'}</Text>
          <Text style={styles.text}>
            All advertising content must comply with applicable laws and regulations. We reserve the right to reject any content that is deemed inappropriate, offensive, or misleading.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>6. Intellectual Property{'\n'}</Text>
          <Text style={styles.text}>
            All content provided through the platform remains the property of its respective owners. Users retain all rights to their advertising content.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>7. Limitation of Liability{'\n'}</Text>
          <Text style={styles.text}>
            The platform shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>8. Modifications{'\n'}</Text>
          <Text style={styles.text}>
            We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>9. Governing Law{'\n'}</Text>
          <Text style={styles.text}>
            These terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>10. Contact Information{'\n'}</Text>
          <Text style={styles.text}>
            If you have any questions about these Terms, please contact us at legal@adplatform.com
          </Text>
        </Text>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  lastUpdated: {
    fontSize: 12,
    color: Colors.text.tertiary,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  bottomSpacer: {
    height: 32,
  },
});
