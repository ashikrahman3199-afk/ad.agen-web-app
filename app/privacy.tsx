import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

export default function PrivacyScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Privacy Policy',
          headerShown: true,
        }} 
      />
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.lastUpdated}>Last updated: January 20, 2025</Text>

        <Text style={styles.intro}>
          Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our advertising platform.
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>1. Information We Collect{'\n'}</Text>
          <Text style={styles.text}>
            We collect information that you provide directly to us, including name, email address, phone number, payment information, and business details. We also automatically collect usage data, device information, and analytics.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>2. How We Use Your Information{'\n'}</Text>
          <Text style={styles.text}>
            We use your information to provide and improve our services, process transactions, send notifications, personalize your experience, and conduct analytics to optimize our platform.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>3. Information Sharing{'\n'}</Text>
          <Text style={styles.text}>
            We do not sell your personal information. We may share your information with service providers who assist us in operations, with your consent, or when required by law.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>4. Data Security{'\n'}</Text>
          <Text style={styles.text}>
            We implement industry-standard security measures to protect your information. All payment data is encrypted and processed through secure payment gateways.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>5. Cookies and Tracking{'\n'}</Text>
          <Text style={styles.text}>
            We use cookies and similar tracking technologies to track activity on our platform and hold certain information to improve your experience.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>6. Your Rights{'\n'}</Text>
          <Text style={styles.text}>
            You have the right to access, update, or delete your personal information. You can also opt-out of marketing communications and disable cookies through your device settings.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>7. Data Retention{'\n'}</Text>
          <Text style={styles.text}>
            We retain your information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your data at any time.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>8. Children&apos;s Privacy{'\n'}</Text>
          <Text style={styles.text}>
            Our platform is not intended for users under the age of 18. We do not knowingly collect information from children under 18.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>9. Changes to This Policy{'\n'}</Text>
          <Text style={styles.text}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>10. Contact Us{'\n'}</Text>
          <Text style={styles.text}>
            If you have questions about this Privacy Policy, please contact us at privacy@adplatform.com
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
    marginBottom: 16,
  },
  intro: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 24,
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
