import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Phone, CreditCard } from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';
import { useApp } from '@/contexts/AppContext';

export default function PaymentOptionsScreen() {
    const router = useRouter();
    const { cartTotal, clearCart } = useApp();
    const [selectedOption, setSelectedOption] = useState<'callback' | 'advance'>('callback');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const platformFee = cartTotal * 0.05;
    const gst = cartTotal * 0.18;
    const estimatedTotal = cartTotal + platformFee + gst;
    const advanceAmount = 7500;

    const handleContinue = () => {
        setShowSuccessModal(true);
    };

    const handleHome = () => {
        setShowSuccessModal(false);
        clearCart();
        router.push('/(tabs)/home');
    };

    return (
        <WebLayout role="client" title="Payment Options">
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={20} color={Colors.text.primary} />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.pageTitle}>Order Summary</Text>

                <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 100 }}>
                    {/* Order Summary Card */}
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>₹{cartTotal.toLocaleString()}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Platform Fee (5%)</Text>
                            <Text style={styles.summaryValue}>₹{platformFee.toLocaleString()}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>GST (18%)</Text>
                            <Text style={styles.summaryValue}>₹{gst.toLocaleString()}</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Estimated Total</Text>
                            <Text style={styles.totalValue}>₹{estimatedTotal.toLocaleString()}</Text>
                        </View>

                        <Text style={styles.disclaimer}>* Prices may vary depending upon services and demand</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Choose Booking Option</Text>

                    {/* Booking Options */}
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity
                            style={[styles.optionCard, selectedOption === 'callback' && styles.optionCardSelected]}
                            onPress={() => setSelectedOption('callback')}
                        >
                            <View style={styles.radioContainer}>
                                <View style={[styles.radioOuter, selectedOption === 'callback' && styles.radioOuterSelected]}>
                                    {selectedOption === 'callback' && <View style={styles.radioInner} />}
                                </View>
                            </View>
                            <View style={styles.optionContent}>
                                <Text style={styles.optionTitle}>Request a Callback</Text>
                                <Text style={styles.optionDescription}>
                                    Our team will review your package and contact you with final pricing and availability. No payment required now.
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.optionCard, selectedOption === 'advance' && styles.optionCardSelected]}
                            onPress={() => setSelectedOption('advance')}
                        >
                            <View style={styles.radioContainer}>
                                <View style={[styles.radioOuter, selectedOption === 'advance' && styles.radioOuterSelected]}>
                                    {selectedOption === 'advance' && <View style={styles.radioInner} />}
                                </View>
                            </View>
                            <View style={styles.optionContent}>
                                <Text style={styles.optionTitle}>Pay Advance & Get Priority Callback</Text>
                                <Text style={styles.optionDescription}>
                                    Secure your booking with a minimal advance of ₹{advanceAmount.toLocaleString()} and get priority processing
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* Footer */}
                <View style={styles.footer}>
                    <View>
                        <Text style={styles.footerLabel}>Estimated Total</Text>
                        <Text style={styles.footerTotal}>₹{estimatedTotal.toLocaleString()}</Text>
                    </View>
                    <TouchableOpacity style={styles.actionBtn} onPress={handleContinue}>
                        <Text style={styles.actionBtnText}>
                            {selectedOption === 'callback' ? 'Request Callback' : 'Proceed to Payment'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Success Modal */}
                <Modal
                    visible={showSuccessModal}
                    transparent={true}
                    animationType="fade"
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.successIconCircle}>
                                <Check size={40} color={Colors.primary} strokeWidth={3} />
                            </View>
                            <Text style={styles.modalTitle}>Request Sent!</Text>
                            <Text style={styles.modalMessage}>
                                Relax you will get a call from our team
                            </Text>
                            <TouchableOpacity style={styles.modalBtn} onPress={handleHome}>
                                <Text style={styles.modalBtnText}>Go to Homepage</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </WebLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: 600,
        width: '100%',
        alignSelf: 'center',
        flex: 1,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
    },
    backText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text.primary,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 24,
        textAlign: 'center',
    },
    content: {
        flex: 1,
    },
    summaryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        ...Colors.shadow.small,
        marginBottom: 32,
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
        marginBottom: 16,
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
    disclaimer: {
        fontSize: 12,
        color: Colors.text.tertiary,
        fontStyle: 'italic',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 16,
    },
    optionsContainer: {
        gap: 16,
    },
    optionCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        gap: 16,
    },
    optionCardSelected: {
        borderColor: Colors.primary,
        backgroundColor: '#FFF5EB',
    },
    radioContainer: {
        paddingTop: 4,
    },
    radioOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioOuterSelected: {
        borderColor: Colors.primary,
    },
    radioInner: {
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
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 8,
    },
    optionDescription: {
        fontSize: 14,
        color: Colors.text.secondary,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        backgroundColor: '#F8F9FA',
    },
    footerLabel: {
        fontSize: 14,
        color: Colors.text.secondary,
    },
    footerTotal: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.text.primary,
    },
    actionBtn: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 16,
        ...Colors.shadow.small,
    },
    actionBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 32,
        padding: 40,
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        ...Colors.shadow.large,
    },
    successIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFF5EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.text.primary,
        marginBottom: 12,
    },
    modalMessage: {
        fontSize: 16,
        color: Colors.text.secondary,
        textAlign: 'center',
        marginBottom: 32,
    },
    modalBtn: {
        width: '100%',
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    modalBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});
