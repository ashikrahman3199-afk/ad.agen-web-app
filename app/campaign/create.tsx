import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Upload, Check, Box, Target, Palette, ShoppingBag, FileText, X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';
import { useApp } from '@/contexts/AppContext';

const STEPS = [
    { id: 1, label: 'Details', icon: Box },
    { id: 2, label: 'Objective', icon: Target },
    { id: 3, label: 'Design', icon: Palette },
    { id: 4, label: 'Services', icon: ShoppingBag },
    { id: 5, label: 'Review', icon: FileText },
];

export default function CreateCampaignScreen() {
    const router = useRouter();
    const { cart, cartTotal } = useApp();
    const [currentStep, setCurrentStep] = useState(1);

    // Form State
    const [campaignName, setCampaignName] = useState('Summer sale');
    const [startDate, setStartDate] = useState('11/12/2025');
    const [endDate, setEndDate] = useState('11/01/2026');
    const [objective, setObjective] = useState('');
    const [designReqs, setDesignReqs] = useState('');

    const handleNext = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        } else {
            router.push('/campaign/payment');
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            router.back();
        }
    };

    const renderStepHeader = () => (
        <View style={styles.stepperContainer}>
            {STEPS.map((step, index) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                const Icon = step.icon;

                return (
                    <View key={step.id} style={styles.stepWrapper}>
                        <View style={styles.stepItem}>
                            <View style={[
                                styles.stepCircle,
                                (isActive || isCompleted) && styles.stepCircleActive,
                                isActive && styles.stepCircleCurrent
                            ]}>
                                {isCompleted ? (
                                    <Check size={16} color="#FFFFFF" />
                                ) : (
                                    <Icon size={16} color={isActive ? '#FFFFFF' : Colors.text.tertiary} />
                                )}
                            </View>
                            <Text style={[
                                styles.stepLabel,
                                (isActive || isCompleted) && styles.stepLabelActive
                            ]}>{step.label}</Text>
                        </View>
                        {index < STEPS.length - 1 && (
                            <View style={[styles.stepLine, isCompleted && styles.stepLineActive]} />
                        )}
                    </View>
                );
            })}
        </View>
    );

    const renderDetailsStep = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Campaign Details</Text>
            <Text style={styles.stepSubtitle}>Give your campaign a name and set the duration</Text>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Campaign Name</Text>
                <TextInput
                    style={styles.input}
                    value={campaignName}
                    onChangeText={setCampaignName}
                    placeholder="Enter campaign name"
                />
            </View>

            <View style={styles.row}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Start Date</Text>
                    <View style={styles.dateInput}>
                        <Calendar size={20} color={Colors.text.tertiary} />
                        <TextInput
                            style={styles.dateTextInput}
                            value={startDate}
                            onChangeText={setStartDate}
                        />
                    </View>
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.label}>End Date</Text>
                    <View style={styles.dateInput}>
                        <Calendar size={20} color={Colors.text.tertiary} />
                        <TextInput
                            style={styles.dateTextInput}
                            value={endDate}
                            onChangeText={setEndDate}
                        />
                    </View>
                </View>
            </View>

            <Text style={styles.subHeader}>Cart Items</Text>
            <View style={styles.cartList}>
                {cart.map((item) => (
                    <View key={item.id} style={styles.cartItemRow}>
                        <Text style={styles.cartItemName}>{item.name}</Text>
                        <View style={styles.cartItemRight}>
                            <Text style={styles.cartItemPrice}>₹{item.price.toLocaleString()}</Text>
                            <TouchableOpacity>
                                <X size={16} color={Colors.error} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );

    const renderObjectiveStep = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Campaign Objective</Text>
            <Text style={styles.stepSubtitle}>What do you want to achieve with this campaign?</Text>

            <View style={styles.optionsList}>
                {['Brand Awareness', 'Lead Generation', 'Product Launch', 'Sales'].map((opt) => (
                    <TouchableOpacity
                        key={opt}
                        style={[styles.optionCard, objective === opt && styles.optionCardSelected]}
                        onPress={() => setObjective(opt)}
                    >
                        <View style={[styles.radioOuter, objective === opt && styles.radioOuterSelected]}>
                            {objective === opt && <View style={styles.radioInner} />}
                        </View>
                        <Text style={styles.optionLabel}>{opt}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderDesignStep = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Design Preferences</Text>
            <Text style={styles.stepSubtitle}>Share your design requirements for each service</Text>

            {cart.map((item) => (
                <View key={item.id} style={styles.designCard}>
                    <Text style={styles.designCardTitle}>{item.name}</Text>
                    <Text style={styles.designCardSubtitle}>{item.location.address}</Text>

                    <TextInput
                        style={styles.textArea}
                        multiline
                        numberOfLines={4}
                        placeholder="Describe design requirements for this service..."
                        value={designReqs}
                        onChangeText={setDesignReqs}
                        textAlignVertical="top"
                    />

                    <TouchableOpacity style={styles.uploadBtn}>
                        <Upload size={20} color={Colors.primary} />
                        <Text style={styles.uploadBtnText}>Upload Your Design</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );

    const renderServicesStep = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Selected Services</Text>
            <Text style={styles.stepSubtitle}>Review the services included in your campaign</Text>

            {cart.map((item) => (
                <View key={item.id} style={styles.serviceReviewCard}>
                    <View>
                        <Text style={styles.serviceReviewTitle}>{item.name}</Text>
                        <Text style={styles.serviceReviewSubtitle}>{item.location.address}</Text>
                        <Text style={styles.serviceReviewMeta}>Duration: {item.duration} days • Qty: {item.quantity}</Text>
                    </View>
                    <Text style={styles.serviceReviewPrice}>₹{item.price.toLocaleString()}</Text>
                </View>
            ))}
        </View>
    );

    const renderReviewStep = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Review & Submit</Text>
            <Text style={styles.stepSubtitle}>Review your campaign details before submitting</Text>

            <View style={styles.reviewCard}>
                <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Campaign Name</Text>
                    <Text style={styles.reviewValue}>{campaignName}</Text>
                </View>
                <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Duration</Text>
                    <Text style={styles.reviewValue}>{startDate} - {endDate}</Text>
                </View>
                <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Total Services</Text>
                    <Text style={styles.reviewValue}>{cart.length} items</Text>
                </View>
                <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Estimated Budget</Text>
                    <Text style={styles.reviewPrice}>₹{cartTotal.toLocaleString()}</Text>
                </View>
            </View>

            <View style={styles.disclaimerBox}>
                <Text style={styles.disclaimerText}>* Prices may vary depending upon demand</Text>
            </View>
        </View>
    );

    return (
        <WebLayout role="client" title="Create Campaign">
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <ArrowLeft size={20} color={Colors.text.primary} />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>

                {renderStepHeader()}

                <ScrollView style={styles.scrollContent} contentContainerStyle={{ paddingBottom: 100 }}>
                    {currentStep === 1 && renderDetailsStep()}
                    {currentStep === 2 && renderObjectiveStep()}
                    {currentStep === 3 && renderDesignStep()}
                    {currentStep === 4 && renderServicesStep()}
                    {currentStep === 5 && renderReviewStep()}
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.continueBtn} onPress={handleNext}>
                        <Text style={styles.continueBtnText}>
                            {currentStep === 5 ? 'Continue to Payment Options' : 'Continue'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </WebLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: 800,
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
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    stepWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    stepItem: {
        alignItems: 'center',
        gap: 8,
        zIndex: 1,
    },
    stepCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepCircleActive: {
        backgroundColor: Colors.primary,
    },
    stepCircleCurrent: {
        backgroundColor: Colors.primary, // Or a different shade if needed
    },
    stepLabel: {
        fontSize: 12,
        color: Colors.text.tertiary,
        fontWeight: '500',
    },
    stepLabelActive: {
        color: Colors.primary,
        fontWeight: '600',
    },
    stepLine: {
        flex: 1,
        height: 2,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 8,
        marginBottom: 20, // Align with circle center roughly
    },
    stepLineActive: {
        backgroundColor: Colors.primary,
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 8,
    },
    stepSubtitle: {
        fontSize: 16,
        color: Colors.text.secondary,
        marginBottom: 32,
    },
    formGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text.primary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: Colors.text.primary,
    },
    row: {
        flexDirection: 'row',
        gap: 16,
    },
    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        gap: 12,
    },
    dateTextInput: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 16,
        color: Colors.text.primary,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 16,
        marginTop: 8,
    },
    cartList: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        gap: 16,
    },
    cartItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    cartItemName: {
        fontSize: 16,
        color: Colors.text.secondary,
    },
    cartItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    cartItemPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.primary,
    },
    optionsList: {
        gap: 16,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        gap: 16,
    },
    optionCardSelected: {
        borderColor: Colors.primary,
        backgroundColor: '#FFF5EB',
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
    optionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text.primary,
    },
    designCard: {
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 16,
    },
    designCardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 4,
    },
    designCardSubtitle: {
        fontSize: 14,
        color: Colors.text.secondary,
        marginBottom: 16,
    },
    textArea: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 16,
        height: 120,
        fontSize: 16,
        color: Colors.text.primary,
        marginBottom: 24,
    },
    uploadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#FFF5EB',
    },
    uploadBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.primary,
    },
    serviceReviewCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 16,
    },
    serviceReviewTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 4,
    },
    serviceReviewSubtitle: {
        fontSize: 14,
        color: Colors.text.secondary,
        marginBottom: 4,
    },
    serviceReviewMeta: {
        fontSize: 12,
        color: Colors.text.tertiary,
    },
    serviceReviewPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.primary,
    },
    reviewCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        gap: 24,
        marginBottom: 24,
    },
    reviewRow: {
        gap: 8,
    },
    reviewLabel: {
        fontSize: 14,
        color: Colors.text.secondary,
    },
    reviewValue: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text.primary,
    },
    reviewPrice: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.primary,
    },
    disclaimerBox: {
        backgroundColor: '#FFFBEB',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    disclaimerText: {
        fontSize: 14,
        color: '#B45309',
        fontStyle: 'italic',
    },
    scrollContent: {
        flex: 1,
    },
    footer: {
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        backgroundColor: '#F8F9FA', // Match background
    },
    continueBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        ...Colors.shadow.small,
    },
    continueBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});
