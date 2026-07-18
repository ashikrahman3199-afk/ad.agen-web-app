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
        <Text style={styles.lastUpdated}>PRIVACY POLICY – Ad.Agen</Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>1. INTRODUCTION{'\n'}</Text>
          <Text style={styles.text}>
            This Privacy Policy explains how Ad.Agen collects, uses, stores, and protects user and vendor data.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>2. LEGAL COMPLIANCE{'\n'}</Text>
          <Text style={styles.text}>
            This Policy complies with:{'\n'}
            (a) Information Technology Act, 2000{'\n'}
            (b) SPDI Rules, 2011{'\n'}
            (c) DPDP Act, 2023
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>3. INFORMATION COLLECTED{'\n'}</Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>3.1 Personal Information</Text>{'\n'}
            Name{'\n'}
            Phone number{'\n'}
            Email{'\n'}
            Address{'\n'}
            Location data{'\n\n'}
            <Text style={{ fontWeight: 'bold' }}>3.2 Vendor Information</Text>{'\n'}
            PAN{'\n'}
            GSTIN{'\n'}
            Bank details{'\n'}
            KYC documents{'\n\n'}
            <Text style={{ fontWeight: 'bold' }}>3.3 Technical Data</Text>{'\n'}
            IP address{'\n'}
            Device data{'\n'}
            Cookies{'\n'}
            Usage logs
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>4. PURPOSE OF COLLECTION{'\n'}</Text>
          <Text style={styles.text}>
            Data is collected for:{'\n'}
            (a) account management;{'\n'}
            (b) transaction processing;{'\n'}
            (c) fraud prevention;{'\n'}
            (d) legal compliance.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>5. PAYMENT PROCESSING{'\n'}</Text>
          <Text style={styles.text}>
            Payments are processed through Cashfree Payments India Pvt. Ltd. and other authorized partners.{'\n'}
            The Platform does not store full card data.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>6. DATA SHARING{'\n'}</Text>
          <Text style={styles.text}>
            We may share data with:{'\n'}
            (a) Vendors;{'\n'}
            (b) payment gateways;{'\n'}
            (c) service providers;{'\n'}
            (d) government authorities if legally required.{'\n\n'}
            We do not sell personal data.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>7. DATA SECURITY{'\n'}</Text>
          <Text style={styles.text}>
            We implement:{'\n'}
            • encryption{'\n'}
            • secure storage{'\n'}
            • access controls{'\n'}
            • audit logging
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>8. USER RIGHTS{'\n'}</Text>
          <Text style={styles.text}>
            Users may:{'\n'}
            (a) access data;{'\n'}
            (b) request correction;{'\n'}
            (c) request deletion;{'\n'}
            (d) withdraw consent.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>9. COOKIES{'\n'}</Text>
          <Text style={styles.text}>
            Cookies are used for:{'\n'}
            • authentication{'\n'}
            • analytics{'\n'}
            • user experience
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>10. CHILDREN{'\n'}</Text>
          <Text style={styles.text}>
            The Platform is not intended for individuals below 18 years.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>11. DATA RETENTION{'\n'}</Text>
          <Text style={styles.text}>
            Data shall be retained as required by law and operational necessity.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>12. GRIEVANCE OFFICER{'\n'}</Text>
          <Text style={styles.text}>
            Contact: support@monomarketers.com
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>13. MODIFICATIONS{'\n'}</Text>
          <Text style={styles.text}>
            The Company may update this Policy from time to time.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>14. GOVERNING LAW{'\n'}</Text>
          <Text style={styles.text}>
            Governed by Indian law and subject to Chennai jurisdiction.
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
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 24,
    textAlign: 'center',
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
