import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

export default function RefundPolicyScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Refund Policy',
          headerShown: true,
        }} 
      />
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.lastUpdated}>REFUND & CANCELLATION POLICY – ad.agen</Text>

        <Text style={styles.intro}>
          <Text style={{ fontWeight: 'bold' }}>Platform:</Text> ad.agen{'\n'}
          <Text style={{ fontWeight: 'bold' }}>Company:</Text> Mono Marketing Enterprises Pvt. Ltd.{'\n'}
          <Text style={{ fontWeight: 'bold' }}>Support Email:</Text> support@monomarketers.com
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>1. INTRODUCTION{'\n'}</Text>
          <Text style={styles.text}>
            This Refund & Cancellation Policy (“Policy”) governs cancellations, refunds, disputes, and related processes for transactions conducted on the ad.agen platform.{'\n\n'}
            By using ad.agen, Users and Vendors agree to this Policy.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>2. PLATFORM ROLE{'\n'}</Text>
          <Text style={styles.text}>
            2.1 ad.agen acts solely as an intermediary marketplace platform connecting Users and Vendors.{'\n'}
            2.2 Mono Marketing Enterprises Pvt. Ltd. is not the direct provider of Vendor services unless explicitly stated.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>3. USER CANCELLATIONS{'\n'}</Text>
          <Text style={styles.text}>
            3.1 Users may cancel an order/service before the Vendor begins fulfillment or within the cancellation period displayed on the Platform.{'\n'}
            3.2 Once a service has been initiated, partially delivered, or fully delivered, cancellation may not be possible.{'\n'}
            3.3 Cancellation requests shall be subject to:{'\n'}
            (a) Vendor policies;{'\n'}
            (b) service type;{'\n'}
            (c) transaction status.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>4. VENDOR CANCELLATIONS{'\n'}</Text>
          <Text style={styles.text}>
            4.1 Vendors shall not unreasonably cancel confirmed services/orders.{'\n'}
            4.2 In the event a Vendor cancels:{'\n'}
            (a) the User may receive a full refund;{'\n'}
            (b) the Platform may take action against the Vendor account.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>5. REFUND ELIGIBILITY{'\n'}</Text>
          <Text style={styles.text}>
            Refunds may be considered in the following cases:{'\n'}
            5.1 Service/Product not delivered.{'\n'}
            5.2 Duplicate payment or payment processing error.{'\n'}
            5.3 Service materially different from description.{'\n'}
            5.4 Unauthorized transaction reported and verified.{'\n'}
            5.5 Vendor unable to fulfill confirmed order/service.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>6. NON-REFUNDABLE SITUATIONS{'\n'}</Text>
          <Text style={styles.text}>
            Refunds shall generally not be provided where:{'\n'}
            6.1 The service has already been delivered or utilized.{'\n'}
            6.2 The User changes their mind after confirmation.{'\n'}
            6.3 Delay is caused due to User unavailability or incorrect information.{'\n'}
            6.4 The issue arises from third-party systems beyond Platform control.{'\n'}
            6.5 Promotional, discounted, or non-refundable campaigns are clearly marked.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>7. PAYMENT FAILURES{'\n'}</Text>
          <Text style={styles.text}>
            7.1 If a payment is debited but transaction confirmation fails:{'\n'}
            (a) the transaction may automatically reverse; or{'\n'}
            (b) refund shall be processed through the payment gateway.{'\n'}
            7.2 Banking timelines may vary.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>8. PAYMENT PROCESSING{'\n'}</Text>
          <Text style={styles.text}>
            8.1 Payments are processed through Cashfree Payments India Pvt. Ltd. and other authorized payment partners.{'\n'}
            8.2 Mono Marketing Enterprises Pvt. Ltd. shall not be liable for:{'\n'}
            (a) banking delays;{'\n'}
            (b) gateway downtime;{'\n'}
            (c) failed transactions caused by third-party systems.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>9. REFUND PROCESS{'\n'}</Text>
          <Text style={styles.text}>
            9.1 Refund requests may be raised through:{'\n'}
            (a) in-app support;{'\n'}
            (b) support@monomarketers.com.{'\n'}
            9.2 Users may be required to provide:{'\n'}
            (a) transaction details;{'\n'}
            (b) screenshots;{'\n'}
            (c) supporting evidence.{'\n'}
            9.3 The Platform reserves the right to:{'\n'}
            (a) investigate claims;{'\n'}
            (b) request additional information;{'\n'}
            (c) approve or reject refund requests.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>10. REFUND TIMELINES{'\n'}</Text>
          <Text style={styles.text}>
            10.1 Approved refunds are generally initiated within 48–72 business hours.{'\n'}
            10.2 Final credit timelines depend on:{'\n'}
            (a) banks;{'\n'}
            (b) card networks;{'\n'}
            (c) UPI/payment systems.{'\n'}
            10.3 Estimated timelines:{'\n'}
            • UPI: 2–7 business days{'\n'}
            • Cards: 5–10 business days{'\n'}
            • Net Banking: 3–7 business days
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>11. CHARGEBACKS & PAYMENT DISPUTES{'\n'}</Text>
          <Text style={styles.text}>
            11.1 Users are encouraged to contact Platform support before initiating chargebacks.{'\n'}
            11.2 Fraudulent or abusive chargebacks may result in:{'\n'}
            (a) account suspension;{'\n'}
            (b) legal action where applicable.{'\n'}
            11.3 The Platform reserves the right to recover chargeback losses from Vendors where appropriate.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>12. FRAUD PREVENTION{'\n'}</Text>
          <Text style={styles.text}>
            12.1 Mono Marketing Enterprises Pvt. Ltd. reserves the right to:{'\n'}
            (a) delay refunds for verification;{'\n'}
            (b) reject suspicious claims;{'\n'}
            (c) suspend accounts involved in fraudulent activity.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>13. LIMITATION OF LIABILITY{'\n'}</Text>
          <Text style={styles.text}>
            13.1 The Platform shall not be liable for:{'\n'}
            (a) indirect losses;{'\n'}
            (b) consequential damages;{'\n'}
            (c) third-party banking/payment failures.{'\n'}
            13.2 Refund liability, where applicable, shall be limited to the transaction amount paid through the Platform.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>14. POLICY CHANGES{'\n'}</Text>
          <Text style={styles.text}>
            14.1 Mono Marketing Enterprises Pvt. Ltd. reserves the right to modify this Policy at any time.{'\n'}
            14.2 Updated versions shall be published on the Platform.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>15. GOVERNING LAW{'\n'}</Text>
          <Text style={styles.text}>
            15.1 This Policy shall be governed by the laws of India.{'\n'}
            15.2 Jurisdiction shall lie with the courts of Chennai, Tamil Nadu.
          </Text>
        </Text>

        <Text style={styles.section}>
          <Text style={styles.sectionTitle}>16. CONTACT & GRIEVANCES{'\n'}</Text>
          <Text style={styles.text}>
            For support, disputes, or refund assistance:{'\n'}
            📧 support@monomarketers.com
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
    marginBottom: 16,
    textAlign: 'center',
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
