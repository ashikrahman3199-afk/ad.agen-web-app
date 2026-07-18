import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CheckSquare, Square } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';
import WebLayout from '@/components/WebLayout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { trpc } from '@/lib/trpc';

export default function CheckoutScreen() {
  const { cart, cartTotal } = useApp();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  
  const createOrderMutation = trpc.payment.createOrder.useMutation();
  const verifyPaymentMutation = trpc.payment.verifyPayment.useMutation();

  useEffect(() => {
    if (Platform.OS === 'web') {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => setIsRazorpayLoaded(true);
      document.body.appendChild(script);
      return () => {
        if (document.body.contains(script)) {
            document.body.removeChild(script);
        }
      };
    } else {
      setIsRazorpayLoaded(true); 
    }
  }, []);

  const platformFee = cartTotal * 0.05; // 5% fee
  const gst = cartTotal * 0.18; // 18% GST
  const finalTotal = cartTotal + platformFee + gst;

  const handleProceed = async () => {
    if (!acceptedTerms) {
      Alert.alert('Terms & Conditions', 'Please accept the Terms & Conditions to proceed.');
      return;
    }

    if (!isRazorpayLoaded) {
      Alert.alert('Loading', 'Payment gateway is still loading. Please wait a moment.');
      return;
    }

    try {
      // 1. Create Order on Backend
      const order = await createOrderMutation.mutateAsync({
        amount: finalTotal,
      });

      if (!order.success || !order.orderId) {
        throw new Error('Failed to create order on server');
      }

      // 2. Open Razorpay Checkout (Web)
      if (Platform.OS === 'web') {
        const options = {
          key: 'rzp_test_T5lX5DVtNDEUmz', // Test Key ID
          amount: order.amount, // in paise
          currency: 'INR',
          name: 'Ad.Agen',
          description: 'Ad Campaign Booking',
          order_id: order.orderId,
          handler: async function (response: any) {
            try {
              // 3. Verify Payment
              const verification = await verifyPaymentMutation.mutateAsync({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verification.success) {
                Alert.alert('Payment Successful', 'Your booking is confirmed!', [
                  { text: 'OK', onPress: () => router.push('/(tabs)/campaigns') }
                ]);
              }
            } catch (err) {
              console.error(err);
              Alert.alert('Payment Verification Failed', 'There was an issue verifying your payment signature.');
            }
          },
          prefill: {
            name: 'Ad.Agen User',
            email: 'user@adagen.com',
            contact: '9999999999'
          },
          theme: {
            color: Colors.primary
          }
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.on('payment.failed', function (response: any) {
          Alert.alert('Payment Failed', response.error.description);
        });
        razorpay.open();
      } else {
        // Mobile fallback
        Alert.alert('Notice', 'Mobile payment integration via SDK is pending. Redirecting to payment screen.', [
          { text: 'OK', onPress: () => router.push('/payment') }
        ]);
      }
    } catch (error: any) {
       console.error("Razorpay Error:", error);
       Alert.alert('Error', error.message || 'Could not initiate payment');
    }
  };

  return (
    <WebLayout role="client" title="Checkout">
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            <View style={styles.summaryList}>
              {cart.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Text style={styles.cartItemName} numberOfLines={1}>{item.title} ({item.quantity} weeks)</Text>
                  <Text style={styles.cartItemPrice}>₹{(item.price * (item.quantity || 1)).toLocaleString()}</Text>
                </View>
              ))}
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items ({cart.length})</Text>
              <Text style={styles.summaryValue}>₹{cartTotal.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Platform Fee</Text>
              <Text style={styles.summaryValue}>₹{platformFee.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>GST (18%)</Text>
              <Text style={styles.summaryValue}>₹{gst.toLocaleString()}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{finalTotal.toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.termsContainer}>
            <TouchableOpacity 
              style={styles.checkboxRow} 
              onPress={() => setAcceptedTerms(!acceptedTerms)}
              activeOpacity={0.7}
            >
              {acceptedTerms ? (
                <CheckSquare size={24} color={Colors.primary} />
              ) : (
                <Square size={24} color={Colors.text.secondary} />
              )}
              <Text style={styles.termsText}>
                I accept the{' '}
                <Text style={styles.termsLink} onPress={() => router.push('/terms')}>
                  Terms & Conditions
                </Text>{' '}
                and understand the cancellation policy.
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.proceedBtn, !acceptedTerms && styles.proceedBtnDisabled]} 
            onPress={handleProceed}
          >
            <Text style={styles.proceedText}>Proceed to Payment</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </WebLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    ...Colors.shadow.medium,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 24,
  },
  summaryList: {
    gap: 12,
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartItemName: {
    fontSize: 15,
    color: Colors.text.secondary,
    flex: 1,
    paddingRight: 16,
  },
  cartItemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
  },
  termsContainer: {
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.text.secondary,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
  proceedBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    ...Colors.shadow.medium,
  },
  proceedBtnDisabled: {
    opacity: 0.6,
  },
  proceedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
