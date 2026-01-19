import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ColorValue,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import { 
  ArrowLeft, 
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle2,
  Lock,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet';

export default function PaymentScreen() {
  const insets = useSafeAreaInsets();
  const { cartTotal, clearCart } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);

  const totalAmount = cartTotal * 1.23;

  const paymentMethods = [
    { id: 'card' as const, name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi' as const, name: 'UPI', icon: Smartphone },
    { id: 'netbanking' as const, name: 'Net Banking', icon: Building2 },
    { id: 'wallet' as const, name: 'Wallet', icon: Smartphone },
  ];

  const handlePayment = async () => {
    setProcessing(true);
    
    setTimeout(() => {
      setProcessing(false);
      clearCart();
      router.replace('/booking-success');
    }, 2000);
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'card':
        return (
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <View style={styles.cardInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor={Colors.text.tertiary}
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="number-pad"
                  maxLength={19}
                />
                <View style={styles.cardLogos}>
                  <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg' }}
                    style={styles.cardLogo}
                  />
                  <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' }}
                    style={styles.cardLogo}
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Cardholder Name</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor={Colors.text.tertiary}
                value={cardName}
                onChangeText={setCardName}
              />
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Expiry Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  placeholderTextColor={Colors.text.tertiary}
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  placeholderTextColor={Colors.text.tertiary}
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="number-pad"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>
          </View>
        );

      case 'upi':
        return (
          <View style={styles.formContainer}>
            <View style={styles.upiOptions}>
              <TouchableOpacity style={styles.upiOption}>
                <Image
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Pay_Logo_%282020%29.svg' }}
                  style={styles.upiLogo}
                />
                <Text style={styles.upiOptionText}>Google Pay</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.upiOption}>
                <Image
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/PhonePe_Logo.svg' }}
                  style={styles.upiLogo}
                />
                <Text style={styles.upiOptionText}>PhonePe</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.upiOption}>
                <Image
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Paytm_logo.svg' }}
                  style={styles.upiLogo}
                />
                <Text style={styles.upiOptionText}>Paytm</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Enter UPI ID</Text>
              <TextInput
                style={styles.input}
                placeholder="yourname@upi"
                placeholderTextColor={Colors.text.tertiary}
                value={upiId}
                onChangeText={setUpiId}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        );

      case 'netbanking':
        return (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Select Your Bank</Text>
            <View style={styles.bankList}>
              {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra Bank'].map(bank => (
                <TouchableOpacity key={bank} style={styles.bankOption}>
                  <View style={styles.bankIcon}>
                    <Building2 size={24} color={Colors.primary} />
                  </View>
                  <Text style={styles.bankName}>{bank}</Text>
                  <View style={styles.radioButton} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'wallet':
        return (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Select Wallet</Text>
            <View style={styles.walletList}>
              {['Paytm', 'PhonePe', 'Amazon Pay', 'Mobikwik'].map(wallet => (
                <TouchableOpacity key={wallet} style={styles.walletOption}>
                  <View style={styles.walletIcon}>
                    <Smartphone size={24} color={Colors.primary} />
                  </View>
                  <Text style={styles.walletName}>{wallet}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.safeBackground} />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Total Amount</Text>
          <Text style={styles.amountValue}>₹{totalAmount.toLocaleString('en-IN')}</Text>
          <View style={styles.amountBreakdown}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Subtotal</Text>
              <Text style={styles.breakdownValue}>₹{cartTotal.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Platform Fee (5%)</Text>
              <Text style={styles.breakdownValue}>₹{(cartTotal * 0.05).toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>GST (18%)</Text>
              <Text style={styles.breakdownValue}>₹{(cartTotal * 0.18).toLocaleString('en-IN')}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.methodsGrid}>
            {paymentMethods.map(method => {
              const Icon = method.icon;
              return (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.methodCard,
                    selectedMethod === method.id && styles.methodCardSelected,
                  ]}
                  onPress={() => setSelectedMethod(method.id)}
                >
                  <View style={[
                    styles.methodIcon,
                    selectedMethod === method.id && styles.methodIconSelected,
                  ]}>
                    <Icon size={24} color={
                      selectedMethod === method.id ? Colors.primary : Colors.text.secondary
                    } />
                  </View>
                  <Text style={[
                    styles.methodName,
                    selectedMethod === method.id && styles.methodNameSelected,
                  ]}>
                    {method.name}
                  </Text>
                  {selectedMethod === method.id && (
                    <View style={styles.selectedIndicator}>
                      <CheckCircle2 size={20} color={Colors.primary} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {renderPaymentForm()}

        <View style={styles.securityBadge}>
          <Lock size={16} color={Colors.success} />
          <Text style={styles.securityText}>
            Your payment information is encrypted and secure
          </Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayment}
          disabled={processing}
        >
          <LinearGradient
            colors={Colors.gradient.primary as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]]}
            style={styles.payGradient}
          >
            {processing ? (
              <Text style={styles.payText}>Processing...</Text>
            ) : (
              <>
                <Lock size={20} color={Colors.text.inverse} />
                <Text style={styles.payText}>
                  Pay ₹{totalAmount.toLocaleString('en-IN')}
                </Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    backgroundColor: Colors.surface,
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
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  amountCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    ...Colors.shadow.medium,
  },
  amountLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 36,
    fontWeight: '700' as const,
    color: Colors.primary,
    marginBottom: 20,
  },
  amountBreakdown: {
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  breakdownValue: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  methodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  methodCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: Colors.border.light,
  },
  methodCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodIconSelected: {
    backgroundColor: Colors.primary + '20',
  },
  methodName: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    textAlign: 'center' as const,
  },
  methodNameSelected: {
    color: Colors.primary,
  },
  selectedIndicator: {
    position: 'absolute' as const,
    top: 8,
    right: 8,
  },
  formContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    gap: 20,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  cardInputContainer: {
    position: 'relative' as const,
  },
  cardLogos: {
    position: 'absolute' as const,
    right: 12,
    top: 12,
    flexDirection: 'row',
    gap: 8,
  },
  cardLogo: {
    width: 32,
    height: 20,
    resizeMode: 'contain' as const,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  upiOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  upiOption: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  upiLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain' as const,
  },
  upiOptionText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border.light,
  },
  dividerText: {
    fontSize: 12,
    color: Colors.text.tertiary,
    fontWeight: '600' as const,
  },
  bankList: {
    gap: 12,
  },
  bankOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  bankIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border.light,
  },
  walletList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  walletOption: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  walletIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletName: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.success + '20',
    borderRadius: 12,
    padding: 16,
  },
  securityText: {
    fontSize: 13,
    color: Colors.success,
    fontWeight: '600' as const,
  },
  bottomSpacer: {
    height: 100,
  },
  footer: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    padding: 16,
    ...Colors.shadow.large,
  },
  payButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  payGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  payText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
});
