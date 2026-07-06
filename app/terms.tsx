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
          title: 'Terms & Conditions',
          headerShown: true,
        }} 
      />
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>USER TERMS & CONDITIONS – ad.agen</Text>

        <Text style={styles.sectionTitle}>1. INTRODUCTION</Text>
        <Text style={styles.paragraph}>
          These Terms govern the use of ad.agen by Users.{'\n'}
          By using the Platform, you agree to these Terms.
        </Text>

        <Text style={styles.sectionTitle}>2. PLATFORM ROLE</Text>
        <Text style={styles.paragraph}>
          2.1 ad.agen is an intermediary marketplace connecting Users and Vendors.{'\n'}
          2.2 The Company does not directly provide Vendor services.
        </Text>

        <Text style={styles.sectionTitle}>3. USER ELIGIBILITY</Text>
        <Text style={styles.paragraph}>
          Users must be 18 years or older.
        </Text>

        <Text style={styles.sectionTitle}>4. USER RESPONSIBILITIES</Text>
        <Text style={styles.paragraph}>
          Users shall:{'\n'}
          (a) provide accurate information;{'\n'}
          (b) comply with applicable law;{'\n'}
          (c) not misuse the Platform.
        </Text>

        <Text style={styles.sectionTitle}>5. PAYMENTS</Text>
        <Text style={styles.paragraph}>
          5.1 Payments are processed via Cashfree Payments India Pvt. Ltd..{'\n'}
          5.2 The Platform is not responsible for:{'\n'}
          (a) bank failures;{'\n'}
          (b) gateway downtime.
        </Text>

        <Text style={styles.sectionTitle}>6. REFUNDS & CANCELLATIONS</Text>
        <Text style={styles.paragraph}>
          6.1 Refunds are governed by the Refund Policy.{'\n'}
          6.2 Refund timelines depend on banking systems.
        </Text>

        <Text style={styles.sectionTitle}>7. PROHIBITED ACTIVITIES</Text>
        <Text style={styles.paragraph}>
          Users shall not:{'\n'}
          (a) engage in fraud;{'\n'}
          (b) abuse Vendors;{'\n'}
          (c) violate laws.
        </Text>

        <Text style={styles.sectionTitle}>8. CONTENT & INTELLECTUAL PROPERTY</Text>
        <Text style={styles.paragraph}>
          All Platform intellectual property belongs to Mono Marketing Enterprises Pvt. Ltd.
        </Text>

        <Text style={styles.sectionTitle}>9. PRIVACY</Text>
        <Text style={styles.paragraph}>
          User data shall be processed as per the Privacy Policy.
        </Text>

        <Text style={styles.sectionTitle}>10. DISCLAIMER</Text>
        <Text style={styles.paragraph}>
          The Platform does not guarantee:{'\n'}
          (a) Vendor performance;{'\n'}
          (b) service quality;{'\n'}
          (c) business outcomes.
        </Text>

        <Text style={styles.sectionTitle}>11. LIMITATION OF LIABILITY</Text>
        <Text style={styles.paragraph}>
          The Company is not liable for:{'\n'}
          (a) Vendor conduct;{'\n'}
          (b) indirect damages;{'\n'}
          (c) payment failures.
        </Text>

        <Text style={styles.sectionTitle}>12. TERMINATION</Text>
        <Text style={styles.paragraph}>
          Accounts may be suspended for violations or suspicious activity.
        </Text>

        <Text style={styles.sectionTitle}>13. GOVERNING LAW</Text>
        <Text style={styles.paragraph}>
          Governed by Indian law.{'\n'}
          Jurisdiction: Chennai, Tamil Nadu.
        </Text>

        <Text style={styles.sectionTitle}>14. DISPUTE RESOLUTION</Text>
        <Text style={styles.paragraph}>
          Disputes subject to arbitration in Chennai.
        </Text>

        <Text style={styles.sectionTitle}>15. CONTACT</Text>
        <Text style={styles.paragraph}>
          support@monomarketers.com
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
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text.primary,
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  bottomSpacer: {
    height: 32,
  },
});
