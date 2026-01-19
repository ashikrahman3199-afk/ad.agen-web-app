import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
  ColorValue,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import { 
  ArrowLeft, 
  Package,
  Target,
  Palette,
  ShoppingBag,
  CheckCircle,
  Calendar as CalendarIcon,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';

type Step = 'details' | 'objective' | 'design' | 'services' | 'review';

export default function CreateCampaignScreen() {
  const insets = useSafeAreaInsets();
  const { cart, cartTotal } = useApp();
  const [currentStep, setCurrentStep] = useState<Step>('details');
  
  const [campaignName, setCampaignName] = useState('Summer sale');
  const [startDate, setStartDate] = useState(new Date(2025, 11, 11));
  const [endDate, setEndDate] = useState(new Date(2026, 0, 11));
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const steps = [
    { id: 'details' as Step, label: 'Details', icon: Package },
    { id: 'objective' as Step, label: 'Objective', icon: Target },
    { id: 'design' as Step, label: 'Design', icon: Palette },
    { id: 'services' as Step, label: 'Services', icon: ShoppingBag },
    { id: 'review' as Step, label: 'Review', icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    } else {
      router.back();
    }
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isActive = index === currentStepIndex;
        const isCompleted = index < currentStepIndex;
        
        return (
          <React.Fragment key={step.id}>
            <View style={styles.stepItem}>
              <View style={[
                styles.stepIconContainer,
                isActive && styles.stepIconContainerActive,
                isCompleted && styles.stepIconContainerCompleted,
              ]}>
                <StepIcon 
                  size={20} 
                  color={isActive || isCompleted ? Colors.text.inverse : Colors.text.tertiary} 
                />
              </View>
              <Text style={[
                styles.stepLabel,
                isActive && styles.stepLabelActive,
              ]}>
                {step.label}
              </Text>
            </View>
            {index < steps.length - 1 && (
              <View style={[
                styles.stepConnector,
                isCompleted && styles.stepConnectorCompleted,
              ]} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );

  const renderDetailsStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Campaign Details</Text>
      <Text style={styles.stepDescription}>
        Give your campaign a name and set the duration
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Campaign Name</Text>
        <TextInput
          style={styles.input}
          value={campaignName}
          onChangeText={setCampaignName}
          placeholder="Enter campaign name"
          placeholderTextColor={Colors.text.tertiary}
        />
      </View>

      <View style={styles.dateRow}>
        <View style={styles.dateGroup}>
          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowStartDatePicker(true)}
          >
            <CalendarIcon size={18} color={Colors.text.secondary} />
            <Text style={styles.dateText}>{formatDate(startDate)}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dateGroup}>
          <Text style={styles.label}>End Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowEndDatePicker(true)}
          >
            <CalendarIcon size={18} color={Colors.text.secondary} />
            <Text style={styles.dateText}>{formatDate(endDate)}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cartSummary}>
        <Text style={styles.cartSummaryTitle}>Cart Items</Text>
        {cart.map((item, index) => (
          <View key={item.id} style={styles.cartItem}>
            <Text style={styles.cartItemName} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.cartItemPrice}>
              ₹{(item.price * item.duration * item.quantity).toLocaleString('en-IN')}
            </Text>
          </View>
        ))}
      </View>

      {showStartDatePicker && (
        <Modal transparent animationType="fade">
          <View style={styles.datePickerModal}>
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={startDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowStartDatePicker(false);
                  if (selectedDate) {
                    setStartDate(selectedDate);
                  }
                }}
              />
              {Platform.OS === 'ios' && (
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setShowStartDatePicker(false)}
                >
                  <Text style={styles.datePickerButtonText}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      )}

      {showEndDatePicker && (
        <Modal transparent animationType="fade">
          <View style={styles.datePickerModal}>
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={endDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                minimumDate={startDate}
                onChange={(event, selectedDate) => {
                  setShowEndDatePicker(false);
                  if (selectedDate) {
                    setEndDate(selectedDate);
                  }
                }}
              />
              {Platform.OS === 'ios' && (
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setShowEndDatePicker(false)}
                >
                  <Text style={styles.datePickerButtonText}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );

  const renderObjectiveStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Campaign Objective</Text>
      <Text style={styles.stepDescription}>
        What do you want to achieve with this campaign?
      </Text>

      <View style={styles.optionsGrid}>
        {['Brand Awareness', 'Lead Generation', 'Product Launch', 'Sales'].map(objective => (
          <TouchableOpacity key={objective} style={styles.optionCard}>
            <Text style={styles.optionText}>{objective}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderDesignStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Design Preferences</Text>
      <Text style={styles.stepDescription}>
        Share your design requirements and preferences
      </Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe your design requirements..."
        placeholderTextColor={Colors.text.tertiary}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />
    </View>
  );

  const renderServicesStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Selected Services</Text>
      <Text style={styles.stepDescription}>
        Review the services included in your campaign
      </Text>

      {cart.map(item => (
        <View key={item.id} style={styles.serviceCard}>
          <View>
            <Text style={styles.serviceName}>{item.title}</Text>
            <Text style={styles.serviceLocation}>{item.location}</Text>
            <Text style={styles.serviceDetails}>
              Duration: {item.duration} {item.priceUnit}(s) • Qty: {item.quantity}
            </Text>
          </View>
          <Text style={styles.servicePrice}>
            ₹{(item.price * item.duration * item.quantity).toLocaleString('en-IN')}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderReviewStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Review & Submit</Text>
      <Text style={styles.stepDescription}>
        Review your campaign details before submitting
      </Text>

      <View style={styles.reviewCard}>
        <Text style={styles.reviewLabel}>Campaign Name</Text>
        <Text style={styles.reviewValue}>{campaignName}</Text>
      </View>

      <View style={styles.reviewCard}>
        <Text style={styles.reviewLabel}>Duration</Text>
        <Text style={styles.reviewValue}>
          {formatDate(startDate)} - {formatDate(endDate)}
        </Text>
      </View>

      <View style={styles.reviewCard}>
        <Text style={styles.reviewLabel}>Total Services</Text>
        <Text style={styles.reviewValue}>{cart.length} items</Text>
      </View>

      <View style={styles.reviewCard}>
        <Text style={styles.reviewLabel}>Estimated Budget</Text>
        <Text style={[styles.reviewValue, styles.reviewPriceValue]}>
          ₹{cartTotal.toLocaleString('en-IN')}
        </Text>
      </View>

      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerText}>
          * Prices may vary depending upon demand
        </Text>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'details':
        return renderDetailsStep();
      case 'objective':
        return renderObjectiveStep();
      case 'design':
        return renderDesignStep();
      case 'services':
        return renderServicesStep();
      case 'review':
        return renderReviewStep();
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.safeBackground} />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Campaign</Text>
        <View style={styles.headerSpacer} />
      </View>

      {renderStepIndicator()}

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {renderCurrentStep()}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            if (currentStep === 'review') {
              router.push('/custom-bundle');
            } else {
              handleNext();
            }
          }}
        >
          <LinearGradient
            colors={Colors.gradient.primary as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]]}
            style={styles.continueGradient}
          >
            <Text style={styles.continueText}>
              {currentStep === 'review' ? 'Continue to Payment Options' : 'Continue'}
            </Text>
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
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: Colors.surface,
  },
  stepItem: {
    alignItems: 'center',
    gap: 8,
  },
  stepIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIconContainerActive: {
    backgroundColor: Colors.primary,
  },
  stepIconContainerCompleted: {
    backgroundColor: Colors.success,
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: Colors.text.tertiary,
  },
  stepLabelActive: {
    color: Colors.primary,
  },
  stepConnector: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.border.light,
    marginHorizontal: 4,
    marginBottom: 28,
  },
  stepConnectorCompleted: {
    backgroundColor: Colors.success,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  textArea: {
    height: 150,
    paddingTop: 16,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  dateGroup: {
    flex: 1,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  dateText: {
    fontSize: 16,
    color: Colors.text.primary,
    fontWeight: '600' as const,
  },
  datePickerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  datePickerButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  datePickerButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
  cartSummary: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    ...Colors.shadow.small,
  },
  cartSummaryTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  cartItemName: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.secondary,
    marginRight: 12,
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  optionsGrid: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.border.light,
    ...Colors.shadow.small,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    textAlign: 'center' as const,
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Colors.shadow.small,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  serviceLocation: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  serviceDetails: {
    fontSize: 12,
    color: Colors.text.tertiary,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  reviewCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewLabel: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  reviewValue: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  reviewPriceValue: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  disclaimerBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: `${Colors.warning}15`,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${Colors.warning}30`,
  },
  disclaimerText: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontStyle: 'italic' as const,
    lineHeight: 16,
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
  continueButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  continueGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
});
