import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
  ColorValue,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import { 
  ArrowLeft, 
  Package,
  DollarSign,
  Calendar,
  Upload,
  X,
  Image as ImageIcon,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';

export default function CustomBundleScreen() {
  const insets = useSafeAreaInsets();
  const { cart, cartTotal, createBooking } = useApp();
  const [paymentOption, setPaymentOption] = useState<'callback' | 'advance' | null>(null);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const totalAmount = cartTotal * 1.23;
  const advanceAmount = Math.round(cartTotal * 0.1);

  const pickImage = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not Available', 'Image upload is not available on web platform');
      return;
    }

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Camera roll permission is needed to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setUploadedImage(result.assets[0].uri);
    }
  };

  const handleProceed = () => {
    if (!paymentOption) {
      Alert.alert('Select Option', 'Please select a payment option to continue');
      return;
    }

    if (paymentOption === 'callback') {
      const newBooking = createBooking({
        campaignName: 'Custom Bundle Campaign',
        startDate: new Date(Date.now() + 86400000 * 7).toISOString(),
        endDate: new Date(Date.now() + 86400000 * 37).toISOString(),
        status: 'pending',
        amount: totalAmount,
        services: cart.map(item => item.title),
        items: cart,
      });
      Alert.alert(
        'Request Sent!',
        'Our team will review your package and contact you shortly with final pricing and next steps.',
        [{ text: 'OK', onPress: () => router.push('/(tabs)/dashboard') }]
      );
    } else if (paymentOption === 'advance') {
      setShowDisclaimerModal(true);
    }
  };

  const handleAdvancePayment = () => {
    setShowDisclaimerModal(false);
    router.push('/payment');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.safeBackground} />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Summary</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cart Summary</Text>
          <View style={styles.summaryCard}>
            {cart.map((item, index) => (
              <View key={item.id} style={[styles.summaryItem, index > 0 && styles.summaryItemBorder]}>
                <View style={styles.summaryItemHeader}>
                  <Text style={styles.summaryItemTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.summaryItemPrice}>
                    ₹{(item.price * item.duration * item.quantity).toLocaleString('en-IN')}
                  </Text>
                </View>
                <View style={styles.summaryItemDetails}>
                  <Text style={styles.summaryItemDetail}>{item.location}</Text>
                  <Text style={styles.summaryItemDetail}>•</Text>
                  <Text style={styles.summaryItemDetail}>{item.duration} {item.priceUnit}(s)</Text>
                  <Text style={styles.summaryItemDetail}>•</Text>
                  <Text style={styles.summaryItemDetail}>Qty: {item.quantity}</Text>
                </View>
              </View>
            ))}

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{cartTotal.toLocaleString('en-IN')}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Platform Fee (5%)</Text>
              <Text style={styles.summaryValue}>₹{(cartTotal * 0.05).toLocaleString('en-IN')}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>GST (18%)</Text>
              <Text style={styles.summaryValue}>₹{(cartTotal * 0.18).toLocaleString('en-IN')}</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotalLabel}>Estimated Total</Text>
              <Text style={styles.summaryTotalValue}>
                ₹{totalAmount.toLocaleString('en-IN')}
              </Text>
            </View>

            <View style={styles.disclaimerBox}>
              <Text style={styles.disclaimerText}>
                * Prices may vary depending upon services and demand
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Booking Option</Text>
          
          <TouchableOpacity
            style={[
              styles.optionCard,
              paymentOption === 'callback' && styles.optionCardSelected,
            ]}
            onPress={() => setPaymentOption('callback')}
          >
            <View style={styles.optionRadio}>
              {paymentOption === 'callback' && (
                <View style={styles.optionRadioDot} />
              )}
            </View>
            <View style={styles.optionContent}>
              <Text style={[
                styles.optionTitle,
                paymentOption === 'callback' && styles.optionTitleSelected,
              ]}>
                Request a Callback
              </Text>
              <Text style={styles.optionDescription}>
                Our team will review your package and contact you with final pricing and availability. No payment required now.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionCard,
              paymentOption === 'advance' && styles.optionCardSelected,
            ]}
            onPress={() => setPaymentOption('advance')}
          >
            <View style={styles.optionRadio}>
              {paymentOption === 'advance' && (
                <View style={styles.optionRadioDot} />
              )}
            </View>
            <View style={styles.optionContent}>
              <Text style={[
                styles.optionTitle,
                paymentOption === 'advance' && styles.optionTitleSelected,
              ]}>
                Pay Advance & Get Priority Callback
              </Text>
              <Text style={styles.optionDescription}>
                Secure your booking with a minimal advance of ₹{advanceAmount.toLocaleString('en-IN')} and get priority processing
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View>
            <Text style={styles.footerLabel}>
              {paymentOption === 'advance' ? 'Advance Amount' : 'Estimated Total'}
            </Text>
            <Text style={styles.footerPrice}>
              ₹{(paymentOption === 'advance' ? advanceAmount : totalAmount).toLocaleString('en-IN')}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.proceedButton, !paymentOption && styles.proceedButtonDisabled]}
            onPress={handleProceed}
            disabled={!paymentOption}
          >
            <LinearGradient
              colors={
                paymentOption
                  ? (Colors.gradient.primary as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]])
                  : ['#ccc', '#999'] as readonly [ColorValue, ColorValue, ...ColorValue[]]
              }
              style={styles.proceedGradient}
            >
              <Text style={styles.proceedText}>
                {paymentOption === 'callback' ? 'Request Callback' : 'Proceed to Payment'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showDisclaimerModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDisclaimerModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.disclaimerModal}>
            <View style={styles.disclaimerModalHeader}>
              <Text style={styles.disclaimerModalTitle}>Important Note</Text>
              <TouchableOpacity onPress={() => setShowDisclaimerModal(false)}>
                <X size={24} color={Colors.text.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.disclaimerModalContent}>
              <View style={styles.disclaimerIconContainer}>
                <DollarSign size={48} color={Colors.primary} />
              </View>
              <Text style={styles.disclaimerModalText}>
                Prices may vary depending upon services and demand. The advance payment of ₹{advanceAmount.toLocaleString('en-IN')} will secure your booking, and the final amount will be confirmed by our team.
              </Text>
              <Text style={styles.disclaimerModalSubtext}>
                You will be contacted within 24 hours with complete details and final pricing.
              </Text>
            </View>

            <View style={styles.disclaimerModalActions}>
              <TouchableOpacity
                style={styles.disclaimerCancelButton}
                onPress={() => setShowDisclaimerModal(false)}
              >
                <Text style={styles.disclaimerCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.disclaimerConfirmButton}
                onPress={handleAdvancePayment}
              >
                <LinearGradient
                  colors={Colors.gradient.primary as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]]}
                  style={styles.disclaimerConfirmGradient}
                >
                  <Text style={styles.disclaimerConfirmText}>I Understand, Continue</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    ...Colors.shadow.medium,
  },
  summaryItem: {
    paddingVertical: 12,
  },
  summaryItemBorder: {
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  summaryItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  summaryItemTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginRight: 12,
  },
  summaryItemPrice: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  summaryItemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  summaryItemDetail: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.border.light,
    marginVertical: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  summaryTotalValue: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  disclaimerBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  disclaimerText: {
    fontSize: 12,
    color: Colors.text.tertiary,
    fontStyle: 'italic' as const,
    lineHeight: 16,
  },
  uploadButton: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderStyle: 'dashed' as const,
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    paddingVertical: 48,
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
  },
  uploadIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  uploadSubtext: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  uploadedContainer: {
    position: 'relative' as const,
    width: '100%',
    height: 200,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover' as const,
  },
  removeImageButton: {
    position: 'absolute' as const,
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    ...Colors.shadow.medium,
  },
  optionCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.border.light,
  },
  optionCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}08`,
  },
  optionRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  optionRadioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 6,
  },
  optionTitleSelected: {
    color: Colors.primary,
  },
  optionDescription: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 120,
  },
  footer: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    ...Colors.shadow.large,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  footerLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  footerPrice: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  proceedButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  proceedButtonDisabled: {
    opacity: 0.5,
  },
  proceedGradient: {
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  proceedText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  disclaimerModal: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    ...Colors.shadow.large,
  },
  disclaimerModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  disclaimerModalTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  disclaimerModalContent: {
    padding: 24,
    alignItems: 'center',
  },
  disclaimerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  disclaimerModalText: {
    fontSize: 15,
    color: Colors.text.primary,
    textAlign: 'center' as const,
    lineHeight: 22,
    marginBottom: 12,
  },
  disclaimerModalSubtext: {
    fontSize: 13,
    color: Colors.text.secondary,
    textAlign: 'center' as const,
    lineHeight: 18,
  },
  disclaimerModalActions: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  disclaimerCancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.background,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  disclaimerCancelText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
  },
  disclaimerConfirmButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  disclaimerConfirmGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  disclaimerConfirmText: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
});
