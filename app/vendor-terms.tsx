import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

export default function VendorTermsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Vendor Terms',
          headerShown: true,
        }} 
      />
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>VENDOR TERMS & CONDITIONS – Ad.Agen</Text>

        <Text style={styles.sectionTitle}>1. INTRODUCTION</Text>
        <Text style={styles.paragraph}>
          These Vendor Terms & Conditions (“Terms”) govern the relationship between Mono Marketing Enterprises Pvt. Ltd. (“Company”, “Platform”, “Ad.Agen”) and any Vendor using the Platform.{'\n'}
          By registering as a Vendor on Ad.Agen, you agree to these Terms.
        </Text>

        <Text style={styles.sectionTitle}>2. DEFINITIONS</Text>
        <Text style={styles.paragraph}>
          2.1 “Platform” means the Ad.Agen mobile application and website.{'\n'}
          2.2 “Vendor” means any individual or entity listing advertisements, services, or products.{'\n'}
          2.3 “User” means any customer using the Platform.{'\n'}
          2.4 “Applicable Law” includes Indian laws including IT Act, GST laws, DPDP Act, and Consumer Protection Act.
        </Text>

        <Text style={styles.sectionTitle}>3. PLATFORM ROLE</Text>
        <Text style={styles.paragraph}>
          3.1 Ad.Agen acts only as an intermediary marketplace platform.{'\n'}
          3.2 The Company:{'\n'}
          (a) does not own Vendor products/services;{'\n'}
          (b) does not guarantee business performance, leads, or sales;{'\n'}
          (c) is not responsible for Vendor conduct.
        </Text>

        <Text style={styles.sectionTitle}>4. VENDOR ELIGIBILITY</Text>
        <Text style={styles.paragraph}>
          4.1 Vendor must:{'\n'}
          (a) be legally capable of entering contracts;{'\n'}
          (b) provide valid KYC and business information;{'\n'}
          (c) comply with Indian laws.
        </Text>

        <Text style={styles.sectionTitle}>5. KYC & VERIFICATION</Text>
        <Text style={styles.paragraph}>
          5.1 Vendor may be required to provide:{'\n'}
          • PAN{'\n'}
          • GSTIN{'\n'}
          • Bank details{'\n'}
          • Government ID{'\n'}
          • Business registration documents{'\n'}
          5.2 The Company reserves the right to suspend accounts for incomplete or false information.
        </Text>

        <Text style={styles.sectionTitle}>6. VENDOR OBLIGATIONS</Text>
        <Text style={styles.paragraph}>
          Vendor shall:{'\n'}
          (a) provide accurate listings;{'\n'}
          (b) fulfill services as promised;{'\n'}
          (c) maintain service quality;{'\n'}
          (d) comply with GST and tax laws;{'\n'}
          (e) not post misleading advertisements.
        </Text>

        <Text style={styles.sectionTitle}>7. PROHIBITED ACTIVITIES</Text>
        <Text style={styles.paragraph}>
          Vendor shall not:{'\n'}
          (a) engage in fraud;{'\n'}
          (b) violate intellectual property rights;{'\n'}
          (c) post unlawful content;{'\n'}
          (d) manipulate transactions or reviews.
        </Text>

        <Text style={styles.sectionTitle}>8. LISTINGS & ADVERTISEMENTS</Text>
        <Text style={styles.paragraph}>
          8.1 Vendor is solely responsible for listing content.{'\n'}
          8.2 The Company may:{'\n'}
          (a) reject advertisements;{'\n'}
          (b) suspend listings;{'\n'}
          (c) remove prohibited content.
        </Text>

        <Text style={styles.sectionTitle}>9. PAYMENTS</Text>
        <Text style={styles.paragraph}>
          9.1 Payments are processed via Cashfree Payments India Pvt. Ltd..{'\n'}
          9.2 Vendor settlements:{'\n'}
          (a) subject to successful payment capture;{'\n'}
          (b) subject to deductions including commission, taxes, refunds, and chargebacks.
        </Text>

        <Text style={styles.sectionTitle}>10. COMMISSION & FEES</Text>
        <Text style={styles.paragraph}>
          10.1 The Platform may charge:{'\n'}
          • service fees{'\n'}
          • commissions{'\n'}
          • promotional charges{'\n'}
          10.2 Fees may change with notice.
        </Text>

        <Text style={styles.sectionTitle}>11. GST & TAX COMPLIANCE</Text>
        <Text style={styles.paragraph}>
          11.1 Vendor is solely responsible for:{'\n'}
          (a) GST registration;{'\n'}
          (b) tax invoices;{'\n'}
          (c) return filing.{'\n'}
          11.2 The Platform may deduct:{'\n'}
          (a) TDS under Section 194-O;{'\n'}
          (b) applicable TCS.
        </Text>

        <Text style={styles.sectionTitle}>12. REFUNDS & CHARGEBACKS</Text>
        <Text style={styles.paragraph}>
          12.1 Refunds may be deducted from Vendor settlements.{'\n'}
          12.2 Chargeback losses arising from Vendor conduct may be recovered from Vendor.
        </Text>

        <Text style={styles.sectionTitle}>13. DATA PROTECTION</Text>
        <Text style={styles.paragraph}>
          13.1 Vendor shall:{'\n'}
          (a) use User data only for service fulfillment;{'\n'}
          (b) comply with DPDP Act, 2023;{'\n'}
          (c) not misuse personal data.
        </Text>

        <Text style={styles.sectionTitle}>14. INTELLECTUAL PROPERTY</Text>
        <Text style={styles.paragraph}>
          14.1 Vendor retains ownership of its content.{'\n'}
          14.2 Vendor grants the Platform a license to display and promote listings.
        </Text>

        <Text style={styles.sectionTitle}>15. INDEMNITY</Text>
        <Text style={styles.paragraph}>
          15.1 Vendor agrees to indemnify Mono Marketing Enterprises Pvt. Ltd. against:{'\n'}
          (a) legal claims;{'\n'}
          (b) tax liabilities;{'\n'}
          (c) consumer complaints;{'\n'}
          (d) fraud or misconduct.
        </Text>

        <Text style={styles.sectionTitle}>16. LIMITATION OF LIABILITY</Text>
        <Text style={styles.paragraph}>
          16.1 The Company shall not be liable for:{'\n'}
          (a) indirect losses;{'\n'}
          (b) downtime;{'\n'}
          (c) business loss;{'\n'}
          (d) third-party payment failures.
        </Text>

        <Text style={styles.sectionTitle}>17. TERMINATION</Text>
        <Text style={styles.paragraph}>
          17.1 The Company may suspend or terminate Vendor accounts for:{'\n'}
          (a) fraud;{'\n'}
          (b) policy violations;{'\n'}
          (c) legal risk.
        </Text>

        <Text style={styles.sectionTitle}>18. GOVERNING LAW</Text>
        <Text style={styles.paragraph}>
          18.1 Governed by laws of India.{'\n'}
          18.2 Jurisdiction: Chennai, Tamil Nadu.
        </Text>

        <Text style={styles.sectionTitle}>19. DISPUTE RESOLUTION</Text>
        <Text style={styles.paragraph}>
          19.1 Disputes shall first be attempted amicably.{'\n'}
          19.2 Failing resolution, disputes shall be referred to arbitration in Chennai.
        </Text>

        <Text style={styles.sectionTitle}>20. CONTACT</Text>
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
