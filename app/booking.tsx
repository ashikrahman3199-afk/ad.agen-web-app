import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ColorValue,
  Modal,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import { 
  ArrowLeft, 
  Calendar, 
  Target, 
  Palette, 
  Package,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';
import { campaignObjectives, designStyles } from '@/constants/adSpaces';

type Step = 'details' | 'objective' | 'design' | 'services' | 'review';

export default function BookingScreen() {
  const { cart, cartTotal } = useApp();
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [campaignName, setCampaignName] = useState('');
  const [campaignObjective, setCampaignObjective] = useState('');
  const [selectedDesign, setSelectedDesign] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [paymentOption, setPaymentOption] = useState<'callback' | 'advance' | null>(null);

  const steps: { id: Step; title: string; icon: any }[] = [
    { id: 'details', title: 'Details', icon: Package },
    { id: 'objective', title: 'Objective', icon: Target },
    { id: 'design', title: 'Design', icon: Palette },
    { id: 'services', title: 'Services', icon: Package },
    { id: 'review', title: 'Review', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const services = [
    { id: 'billboards', name: 'Billboards', description: 'Outdoor advertising' },
    { id: 'social-media', name: 'Social Media', description: 'Digital campaigns' },
    { id: 'print-media', name: 'Print Media', description: 'Newspapers & magazines' },
    { id: 'radio', name: 'Radio', description: 'Audio advertising' },
    { id: 'cinema', name: 'Cinema', description: 'Theater advertising' },
    { id: 'influencers', name: 'Influencers', description: 'Creator partnerships' },
  ];

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    } else {
      if (paymentOption === 'callback') {
        console.log('Booking request sent to team for callback');
        router.push('/booking-success');
      } else if (paymentOption === 'advance') {
        router.push('/payment');
      }
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    } else {
      router.back();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'details':
        return campaignName.trim().length > 0;
      case 'objective':
        return campaignObjective.length > 0;
      case 'design':
        return selectedDesign.length > 0;
      case 'services':
        return selectedServices.length > 0;
      case 'review':
        return paymentOption !== null;
      default:
        return false;
    }
  };

  const getMarkedDates = () => {
    const marked: Record<string, any> = {};
    const today = new Date();
    const unavailableDates = [
      new Date(today.getFullYear(), today.getMonth(), 5),
      new Date(today.getFullYear(), today.getMonth(), 12),
      new Date(today.getFullYear(), today.getMonth(), 19),
      new Date(today.getFullYear(), today.getMonth(), 26),
    ];

    unavailableDates.forEach(date => {
      const dateStr = date.toISOString().split('T')[0];
      marked[dateStr] = {
        disabled: true,
        disableTouchEvent: true,
        color: Colors.border.light,
        textColor: Colors.text.tertiary,
      };
    });

    if (startDate) {
      marked[startDate] = {
        selected: true,
        selectedColor: Colors.primary,
        selectedTextColor: Colors.text.inverse,
      };
    }
    if (endDate) {
      marked[endDate] = {
        selected: true,
        selectedColor: Colors.primary,
        selectedTextColor: Colors.text.inverse,
      };
    }

    return marked;
  };

  const pickImage = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not Available', 'Image upload is not available on web');
      return;
    }

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'You need to grant camera roll permissions to upload images.');
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 'details':
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Campaign Details</Text>
            <Text style={styles.stepDescription}>
              Give your campaign a name and set the duration
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Campaign Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Summer Sale 2024"
                placeholderTextColor={Colors.text.tertiary}
                value={campaignName}
                onChangeText={setCampaignName}
              />
            </View>

            <View style={styles.dateRow}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Start Date</Text>
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={() => setShowStartCalendar(true)}
                >
                  <Calendar size={18} color={Colors.text.secondary} />
                  <Text style={[
                    styles.dateInputText,
                    !startDate && styles.dateInputPlaceholder
                  ]}>
                    {startDate ? new Date(startDate).toLocaleDateString('en-GB') : 'Select Date'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>End Date</Text>
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={() => setShowEndCalendar(true)}
                >
                  <Calendar size={18} color={Colors.text.secondary} />
                  <Text style={[
                    styles.dateInputText,
                    !endDate && styles.dateInputPlaceholder
                  ]}>
                    {endDate ? new Date(endDate).toLocaleDateString('en-GB') : 'Select Date'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.cartSummary}>
              <Text style={styles.cartSummaryTitle}>Cart Items</Text>
              {cart.map(item => (
                <View key={item.id} style={styles.cartSummaryItem}>
                  <Text style={styles.cartSummaryItemName} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.cartSummaryItemPrice}>
                    ₹{(item.price * item.duration * item.quantity).toLocaleString('en-IN')}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );

      case 'objective':
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Campaign Objective</Text>
            <Text style={styles.stepDescription}>
              What&apos;s the main goal of your campaign?
            </Text>

            <View style={styles.optionsGrid}>
              {campaignObjectives.map(objective => (
                <TouchableOpacity
                  key={objective.id}
                  style={[
                    styles.optionCard,
                    campaignObjective === objective.id && styles.optionCardSelected,
                  ]}
                  onPress={() => setCampaignObjective(objective.id)}
                >
                  <View style={[
                    styles.optionIconContainer,
                    campaignObjective === objective.id && styles.optionIconContainerSelected,
                  ]}>
                    <Target size={24} color={
                      campaignObjective === objective.id ? Colors.primary : Colors.text.secondary
                    } />
                  </View>
                  <Text style={[
                    styles.optionTitle,
                    campaignObjective === objective.id && styles.optionTitleSelected,
                  ]}>
                    {objective.name}
                  </Text>
                  {campaignObjective === objective.id && (
                    <View style={styles.selectedBadge}>
                      <CheckCircle2 size={20} color={Colors.primary} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'design':
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Choose Ad Design</Text>
            <Text style={styles.stepDescription}>
              Select a design style that matches your brand identity
            </Text>

            <View style={styles.designList}>
              {designStyles.map(design => (
                <TouchableOpacity
                  key={design.id}
                  style={[
                    styles.designCard,
                    selectedDesign === design.id && styles.designCardSelected,
                  ]}
                  onPress={() => setSelectedDesign(design.id)}
                >
                  <View style={styles.designCardContent}>
                    <View style={[
                      styles.designIconContainer,
                      selectedDesign === design.id && styles.designIconContainerSelected,
                    ]}>
                      <Palette size={24} color={
                        selectedDesign === design.id ? Colors.primary : Colors.text.secondary
                      } />
                    </View>
                    <View style={styles.designInfo}>
                      <Text style={[
                        styles.designTitle,
                        selectedDesign === design.id && styles.designTitleSelected,
                      ]}>
                        {design.name}
                      </Text>
                      <Text style={styles.designDescription}>
                        {design.description}
                      </Text>
                    </View>
                  </View>
                  {selectedDesign === design.id && (
                    <CheckCircle2 size={24} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.uploadSection}>
              <Text style={styles.uploadSectionTitle}>Or Upload Your Design</Text>
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                {uploadedImage ? (
                  <View style={styles.uploadedImageContainer}>
                    <Image source={{ uri: uploadedImage }} style={styles.uploadedImage} />
                    <View style={styles.uploadOverlay}>
                      <Text style={styles.uploadOverlayText}>Tap to change</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.uploadPlaceholder}>
                    <Palette size={32} color={Colors.text.tertiary} />
                    <Text style={styles.uploadPlaceholderText}>Upload Image</Text>
                    <Text style={styles.uploadPlaceholderSubtext}>16:9 aspect ratio recommended</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'services':
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Select Ad Services</Text>
            <Text style={styles.stepDescription}>
              Choose the types of ads you want to include in your bundle
            </Text>

            <View style={styles.servicesList}>
              {services.map(service => (
                <TouchableOpacity
                  key={service.id}
                  style={[
                    styles.serviceCard,
                    selectedServices.includes(service.id) && styles.serviceCardSelected,
                  ]}
                  onPress={() => toggleService(service.id)}
                >
                  <View style={styles.serviceCardContent}>
                    <View style={[
                      styles.serviceCheckbox,
                      selectedServices.includes(service.id) && styles.serviceCheckboxSelected,
                    ]}>
                      {selectedServices.includes(service.id) && (
                        <CheckCircle2 size={20} color={Colors.primary} />
                      )}
                    </View>
                    <View style={styles.serviceInfo}>
                      <Text style={[
                        styles.serviceTitle,
                        selectedServices.includes(service.id) && styles.serviceTitleSelected,
                      ]}>
                        {service.name}
                      </Text>
                      <Text style={styles.serviceDescription}>
                        {service.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'review':
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Review & Confirm</Text>
            <Text style={styles.stepDescription}>
              Review your campaign details before requesting team callback
            </Text>

            <View style={styles.reviewCard}>
              <View style={styles.reviewSection}>
                <Text style={styles.reviewLabel}>Campaign Name</Text>
                <Text style={styles.reviewValue}>{campaignName}</Text>
              </View>

              <View style={styles.reviewSection}>
                <Text style={styles.reviewLabel}>Objective</Text>
                <Text style={styles.reviewValue}>
                  {campaignObjectives.find(o => o.id === campaignObjective)?.name}
                </Text>
              </View>

              <View style={styles.reviewSection}>
                <Text style={styles.reviewLabel}>Design Style</Text>
                <Text style={styles.reviewValue}>
                  {designStyles.find(d => d.id === selectedDesign)?.name}
                </Text>
              </View>

              <View style={styles.reviewSection}>
                <Text style={styles.reviewLabel}>Selected Services</Text>
                <View style={styles.reviewTags}>
                  {selectedServices.map(serviceId => (
                    <View key={serviceId} style={styles.reviewTag}>
                      <Text style={styles.reviewTagText}>
                        {services.find(s => s.id === serviceId)?.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.reviewDivider} />

              <View style={styles.reviewSection}>
                <Text style={styles.reviewLabel}>Estimated Total</Text>
                <Text style={styles.reviewTotal}>
                  ₹{(cartTotal * 1.23).toLocaleString('en-IN')}
                </Text>
                <View style={styles.priceDisclaimer}>
                  <Text style={styles.priceDisclaimerText}>
                    * Prices may vary depending upon the demand
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.bookingOptionsCard}>
              <Text style={styles.bookingOptionsTitle}>Choose Booking Option</Text>
              
              <TouchableOpacity
                style={[
                  styles.bookingOptionCard,
                  paymentOption === 'callback' && styles.bookingOptionCardSelected,
                ]}
                onPress={() => setPaymentOption('callback')}
              >
                <View style={styles.bookingOptionContent}>
                  <View style={[
                    styles.bookingOptionRadio,
                    paymentOption === 'callback' && styles.bookingOptionRadioSelected,
                  ]}>
                    {paymentOption === 'callback' && (
                      <View style={styles.bookingOptionRadioDot} />
                    )}
                  </View>
                  <View style={styles.bookingOptionInfo}>
                    <Text style={[
                      styles.bookingOptionTitle,
                      paymentOption === 'callback' && styles.bookingOptionTitleSelected,
                    ]}>
                      Get a Callback from Team
                    </Text>
                    <Text style={styles.bookingOptionDescription}>
                      Our team will review your package and contact you with final pricing and next steps
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.bookingOptionCard,
                  paymentOption === 'advance' && styles.bookingOptionCardSelected,
                ]}
                onPress={() => setPaymentOption('advance')}
              >
                <View style={styles.bookingOptionContent}>
                  <View style={[
                    styles.bookingOptionRadio,
                    paymentOption === 'advance' && styles.bookingOptionRadioSelected,
                  ]}>
                    {paymentOption === 'advance' && (
                      <View style={styles.bookingOptionRadioDot} />
                    )}
                  </View>
                  <View style={styles.bookingOptionInfo}>
                    <Text style={[
                      styles.bookingOptionTitle,
                      paymentOption === 'advance' && styles.bookingOptionTitleSelected,
                    ]}>
                      Pay Advance & Get Callback
                    </Text>
                    <Text style={styles.bookingOptionDescription}>
                      Pay a minimal advance amount (₹{Math.round(cartTotal * 0.1).toLocaleString('en-IN')}) to secure your booking
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Create Campaign',
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <ArrowLeft size={24} color={Colors.text.primary} />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;

            return (
              <View key={step.id} style={styles.progressStep}>
                <View style={[
                  styles.progressDot,
                  isActive && styles.progressDotActive,
                  isCompleted && styles.progressDotCompleted,
                ]}>
                  {isCompleted ? (
                    <CheckCircle2 size={20} color={Colors.surface} />
                  ) : (
                    <Icon size={20} color={
                      isActive ? Colors.surface : Colors.text.tertiary
                    } />
                  )}
                </View>
                {index < steps.length - 1 && (
                  <View style={[
                    styles.progressLine,
                    isCompleted && styles.progressLineCompleted,
                  ]} />
                )}
              </View>
            );
          })}
        </View>
        <View style={styles.progressLabels}>
          {steps.map((step, index) => (
            <Text
              key={step.id}
              style={[
                styles.progressLabel,
                index === currentStepIndex && styles.progressLabelActive,
              ]}
            >
              {step.title}
            </Text>
          ))}
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {renderStepContent()}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      <Modal
        visible={showStartCalendar}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowStartCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarModal}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>Select Start Date</Text>
              <TouchableOpacity onPress={() => setShowStartCalendar(false)}>
                <Text style={styles.calendarClose}>Done</Text>
              </TouchableOpacity>
            </View>
            <RNCalendar
              onDayPress={(day) => {
                setStartDate(day.dateString);
                setShowStartCalendar(false);
              }}
              markedDates={getMarkedDates()}
              minDate={new Date().toISOString().split('T')[0]}
              theme={{
                backgroundColor: Colors.background,
                calendarBackground: Colors.surface,
                textSectionTitleColor: Colors.text.primary,
                selectedDayBackgroundColor: Colors.primary,
                selectedDayTextColor: Colors.text.inverse,
                todayTextColor: Colors.primary,
                dayTextColor: Colors.text.primary,
                textDisabledColor: Colors.text.tertiary,
                dotColor: Colors.primary,
                selectedDotColor: Colors.text.inverse,
                arrowColor: Colors.primary,
                monthTextColor: Colors.text.primary,
                textDayFontWeight: '400',
                textMonthFontWeight: '700',
                textDayHeaderFontWeight: '600',
              }}
            />
            <View style={styles.calendarLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.border.light }]} />
                <Text style={styles.legendText}>Unavailable</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
                <Text style={styles.legendText}>Selected</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showEndCalendar}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEndCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarModal}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>Select End Date</Text>
              <TouchableOpacity onPress={() => setShowEndCalendar(false)}>
                <Text style={styles.calendarClose}>Done</Text>
              </TouchableOpacity>
            </View>
            <RNCalendar
              onDayPress={(day) => {
                setEndDate(day.dateString);
                setShowEndCalendar(false);
              }}
              markedDates={getMarkedDates()}
              minDate={startDate || new Date().toISOString().split('T')[0]}
              theme={{
                backgroundColor: Colors.background,
                calendarBackground: Colors.surface,
                textSectionTitleColor: Colors.text.primary,
                selectedDayBackgroundColor: Colors.primary,
                selectedDayTextColor: Colors.text.inverse,
                todayTextColor: Colors.primary,
                dayTextColor: Colors.text.primary,
                textDisabledColor: Colors.text.tertiary,
                dotColor: Colors.primary,
                selectedDotColor: Colors.text.inverse,
                arrowColor: Colors.primary,
                monthTextColor: Colors.text.primary,
                textDayFontWeight: '400',
                textMonthFontWeight: '700',
                textDayHeaderFontWeight: '600',
              }}
            />
            <View style={styles.calendarLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.border.light }]} />
                <Text style={styles.legendText}>Unavailable</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
                <Text style={styles.legendText}>Selected</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !canProceed() && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <LinearGradient
            colors={
              canProceed()
                ? (Colors.gradient.primary as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]])
                : ['#ccc', '#999'] as readonly [ColorValue, ColorValue, ...ColorValue[]]
            }
            style={styles.nextGradient}
          >
            <Text style={styles.nextText}>
              {currentStep === 'review' 
                ? (paymentOption === 'callback' ? 'Request Callback' : 'Proceed to Payment')
                : 'Continue'
              }
            </Text>
            <ChevronRight size={20} color={Colors.text.inverse} />
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
  backButton: {
    padding: 8,
    marginLeft: 8,
  },
  progressContainer: {
    backgroundColor: Colors.surface,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressStep: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDotActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  progressDotCompleted: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.border.light,
    marginHorizontal: 4,
  },
  progressLineCompleted: {
    backgroundColor: Colors.primary,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 11,
    color: Colors.text.tertiary,
    fontWeight: '600' as const,
    flex: 1,
    textAlign: 'center' as const,
  },
  progressLabelActive: {
    color: Colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  stepContent: {
    gap: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  stepDescription: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 22,
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
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  dateInputText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  dateInputPlaceholder: {
    color: Colors.text.tertiary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  calendarModal: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  calendarClose: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  calendarLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  uploadSection: {
    marginTop: 8,
  },
  uploadSectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  uploadButton: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderStyle: 'dashed' as const,
  },
  uploadPlaceholder: {
    paddingVertical: 48,
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
  },
  uploadPlaceholderText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  uploadPlaceholderSubtext: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  uploadedImageContainer: {
    position: 'relative' as const,
    width: '100%',
    height: 200,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover' as const,
  },
  uploadOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadOverlayText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.inverse,
  },
  cartSummary: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginTop: 8,
  },
  cartSummaryTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  cartSummaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartSummaryItemName: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.secondary,
    marginRight: 12,
  },
  cartSummaryItemPrice: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  optionsGrid: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 2,
    borderColor: Colors.border.light,
  },
  optionCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  optionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionIconContainerSelected: {
    backgroundColor: Colors.primary + '20',
  },
  optionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  optionTitleSelected: {
    color: Colors.primary,
  },
  selectedBadge: {
    marginLeft: 'auto' as const,
  },
  designList: {
    gap: 12,
  },
  designCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: Colors.border.light,
  },
  designCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  designCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  designIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  designIconContainerSelected: {
    backgroundColor: Colors.primary + '20',
  },
  designInfo: {
    flex: 1,
  },
  designTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  designTitleSelected: {
    color: Colors.primary,
  },
  designDescription: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  servicesList: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.border.light,
  },
  serviceCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  serviceCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  serviceCheckbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceCheckboxSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '20',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  serviceTitleSelected: {
    color: Colors.primary,
  },
  serviceDescription: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  reviewCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    gap: 20,
  },
  reviewSection: {
    gap: 8,
  },
  reviewLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
    textTransform: 'uppercase' as const,
  },
  reviewValue: {
    fontSize: 16,
    color: Colors.text.primary,
    fontWeight: '600' as const,
  },
  reviewTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  reviewTag: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  reviewTagText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  reviewDivider: {
    height: 1,
    backgroundColor: Colors.border.light,
  },
  reviewTotal: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  priceDisclaimer: {
    marginTop: 8,
    paddingTop: 8,
  },
  priceDisclaimerText: {
    fontSize: 12,
    color: Colors.text.tertiary,
    fontStyle: 'italic' as const,
  },
  bookingOptionsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  bookingOptionsTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  bookingOptionCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.border.light,
  },
  bookingOptionCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '08',
  },
  bookingOptionContent: {
    flexDirection: 'row',
    gap: 12,
  },
  bookingOptionRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  bookingOptionRadioSelected: {
    borderColor: Colors.primary,
  },
  bookingOptionRadioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  bookingOptionInfo: {
    flex: 1,
  },
  bookingOptionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 6,
  },
  bookingOptionTitleSelected: {
    color: Colors.primary,
  },
  bookingOptionDescription: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 18,
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
  nextButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  nextText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
});
